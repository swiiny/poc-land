// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Poc.sol";
contract PocFactory {
    
    mapping(address => mapping(string =>address)) creatorToPoc;

    function createPoc (
        address _creator,
        string memory _name,
        string memory _symbol,
        uint256 _maxPocAmount,
        string memory _baseURI,
        ISuperfluid host,
        ISuperToken acceptedToken
    ) public {
        Poc poc = new Poc(_creator,_name, _symbol, _maxPocAmount, _baseURI, host, acceptedToken);
        creatorToPoc[_creator][_name] = address(poc);
    }

    function getPocWithEventAndCreator(address creator, string memory name) public view returns (address) {
        return creatorToPoc[creator][name];
    }
}