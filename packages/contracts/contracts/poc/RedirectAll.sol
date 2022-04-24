// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import {ISuperfluid, ISuperToken, ISuperApp, ISuperAgreement, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {SuperAppBase} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

contract RedirectAll is SuperAppBase {

    using CFAv1Library for CFAv1Library.InitData;

    //initialize cfaV1 variable
    CFAv1Library.InitData private cfaV1;

    ISuperfluid private _host; // host
    IConstantFlowAgreementV1 private _cfa; // the stored constant flow agreement class address
    ISuperToken private _acceptedToken; // accepted token
    mapping (address => int256) private _receivers;
    uint256 constant internal maxPocAmount = 20;
    address[maxPocAmount] private _receiverAddresses;
    int256 private lastUpdateReceiverNb;

   constructor(
        ISuperfluid host,
        ISuperToken acceptedToken
    ) {
        assert(address(host) != address(0));
        assert(address(acceptedToken) != address(0));

        _host = host;
        _cfa = IConstantFlowAgreementV1(
            address(
                host.getAgreementClass(
                    keccak256(
                        "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
                    )
                )
            )
        );
        _acceptedToken = acceptedToken;

        cfaV1 = CFAv1Library.InitData(_host, _cfa);

        uint256 configWord =
            SuperAppDefinitions.APP_LEVEL_FINAL |
            SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP;

        _host.registerApp(configWord);
    }

    /**************************************************************************
     * Redirect Logic
     *************************************************************************/

    // @dev adds a receiver to the list of receivers if not already present
    function _addReceiver(address receiver, uint256 tokenId) internal {
        // check if receiver is already in the list
        // require(_receivers[receiver] != 0 || _receiverAddresses[tokenId-1] == address(0));
        require(_receiverAddresses[tokenId-1] == address(0));
        // create flow for this user
        require(receiver != address(0), "New receiver is zero address");
        // @dev because our app is registered as final, we can't take downstream apps
        require(
            !_host.isApp(ISuperApp(receiver)),
            "New receiver can not be a superApp"
        );
        _receiverAddresses[tokenId-1] = receiver;
    }

    /// @dev If a new stream is opened, or an existing one is opened
    function _updateOutflow(bytes calldata ctx)
        private
        returns (bytes memory newCtx)
    {
        require(_receiverAddresses[0] != address(0), "No receiver to redirect to");
        newCtx = ctx;
        // @dev This will give me the new flowRate, as it is called in after callbacks
        int96 netFlowRate = _cfa.getNetFlow(_acceptedToken, address(this));
        (, int96 outFlowRate, , ) = _cfa.getFlow(
            _acceptedToken,
            address(this),
            _receiverAddresses[0]
        ); // CHECK: unclear what happens if flow doesn't exist.
        int96 inFlowRate = netFlowRate + int96(int256(outFlowRate) * lastUpdateReceiverNb);

        int256 newReceiverNb = lastUpdateReceiverNb;
        for (uint256 i = uint256(lastUpdateReceiverNb); i < _receiverAddresses.length; i++) {
          if (_receiverAddresses[i] == address(0)) {
            break; 
          }
          newReceiverNb++;
        }
        
        int96 newOutFlowRate = int96(int256(inFlowRate) / newReceiverNb);

        // @dev If inFlowRate === 0, then delete existing flow.
        if (inFlowRate == int96(0)) {
            // @dev if inFlowRate is zero, delete outflow.
            for (uint256 i = 0; i < _receiverAddresses.length; i++) {
                if (_receiverAddresses[i] == address(0)) {
                    break;
                }
                newCtx = cfaV1.deleteFlowWithCtx(
                            newCtx,
                            address(this),
                            _receiverAddresses[i],
                            _acceptedToken
                        );
            }
        } else if (outFlowRate != int96(0)) {
            for (uint256 i = 0; i < _receiverAddresses.length; i++) {
                if (_receiverAddresses[i] == address(0)) {
                    break;
                }
                newCtx = cfaV1.updateFlowWithCtx(
                            newCtx,
                            _receiverAddresses[i],
                            _acceptedToken,
                            newOutFlowRate
                        );
            }
        } else {
            // @dev If there is no existing outflow, then create new flow to equal inflow
            for (uint256 i = 0; i < _receiverAddresses.length; i++) {
                if (_receiverAddresses[i] == address(0)) {
                    break;
                }
                newCtx = cfaV1.createFlowWithCtx(
                            newCtx,
                            _receiverAddresses[i],
                            _acceptedToken,
                            newOutFlowRate
                        );
            }
        }
        lastUpdateReceiverNb = newReceiverNb;
    }

    // @dev Change the Receiver of the total flow
    function _changeReceiver(address oldReceiver, address newReceiver, uint256 tokenId) internal {
        if (_receiverAddresses[tokenId-1] == address(0)) {
            return;
        }
        require(_receiverAddresses[tokenId-1] == oldReceiver);
        require(newReceiver != address(0), "New receiver is zero address");
        // @dev because our app is registered as final, we can't take downstream apps
        require(
            !_host.isApp(ISuperApp(newReceiver)),
            "New receiver can not be a superApp"
        );
        if (newReceiver == oldReceiver) return;

        // @dev delete flow to old receiver
        (, int96 outFlowRate, , ) = _cfa.getFlow(
            _acceptedToken,
            address(this),
            oldReceiver
        ); //CHECK: unclear what happens if flow doesn't exist.
        if (outFlowRate > 0) {
            cfaV1.deleteFlow(address(this), oldReceiver, _acceptedToken);
            // @dev create flow to new receiver
            cfaV1.createFlow(
                newReceiver,
                _acceptedToken,
                _cfa.getNetFlow(_acceptedToken, address(this))
            );
        }

        _receiverAddresses[tokenId-1] = newReceiver;
    }

    /**************************************************************************
     * SuperApp callbacks
     *************************************************************************/

    function afterAgreementCreated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32,
        bytes calldata,
        bytes calldata,
        bytes calldata _ctx
    )
        external
        override
        onlyExpected(_superToken, _agreementClass)
        onlyHost
        returns (bytes memory newCtx)
    {
        return _updateOutflow(_ctx);
    }

    function afterAgreementUpdated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32,
        bytes calldata,
        bytes calldata,
        bytes calldata _ctx
    )
        external
        override
        onlyExpected(_superToken, _agreementClass)
        onlyHost
        returns (bytes memory newCtx)
    {
        return _updateOutflow(_ctx);
    }

    function afterAgreementTerminated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, //_agreementId,
        bytes calldata, //  _agreementData
        bytes calldata, //_cbdata,
        bytes calldata _ctx
    ) external override onlyHost returns (bytes memory newCtx) {
        // According to the app basic law, we should never revert in a termination callback
        if (!_isSameToken(_superToken) || !_isCFAv1(_agreementClass))
            return _ctx;
        return _updateOutflow(_ctx);
    }

    function _isSameToken(ISuperToken superToken) private view returns (bool) {
        return address(superToken) == address(_acceptedToken);
    }

    function _isCFAv1(address agreementClass) private view returns (bool) {
        return
            ISuperAgreement(agreementClass).agreementType() ==
            keccak256(
                "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
            );
    }

    modifier onlyHost() {
        require(
            msg.sender == address(_host),
            "RedirectAll: support only one host"
        );
        _;
    }

    modifier onlyExpected(ISuperToken superToken, address agreementClass) {
        require(_isSameToken(superToken), "RedirectAll: not accepted token");
        require(_isCFAv1(agreementClass), "RedirectAll: only CFAv1 supported");
        _;
    }
}