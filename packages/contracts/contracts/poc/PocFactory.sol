// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./Poc.sol";

contract PocFactory {

    event NewPoc(address creator, string name, address poc);

    function createPoc (
        // address _gasLessMinter,
        address _creator,
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        ISuperfluid host,
        ISuperToken acceptedToken
    ) public {
        Poc poc = new Poc(_name, _symbol, _baseURI, host, acceptedToken);
        emit NewPoc(_creator, _name, address(poc));
    }

}