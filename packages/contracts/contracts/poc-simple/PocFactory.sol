// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Poc.sol";
contract PocFactory {

    mapping (string => address) pocs;
    mapping(address => address) creatorToPoc;

    function createPoc(address _creator, string memory _name,string memory _symbol, uint256 _maxPocAmount, string memory _baseURI) public {
        Poc poc = new Poc(_creator,_name, _symbol, _maxPocAmount, _baseURI);
        creatorToPoc[_creator] = address(poc);
    }

}