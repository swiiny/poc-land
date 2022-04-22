// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Poc.sol";
contract PocFactory {

    mapping (string => address) pocs;

    function createPoc(string memory _name,string memory _symbol, uint256 _maxPocAmount, string memory _baseURI) public {
        Poc poc = new Poc(_name, _symbol, _maxPocAmount, _baseURI);
        pocs[_name] = address(poc);
    }

}