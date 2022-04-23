// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Poc.sol";
contract PocFactory {
    mapping(address => uint256) creatorToPocIndex;
    mapping(address => mapping(uint256 => address)) creatorToPoc;

    event NewPoc(address creator, string name, address poc);

    function createPoc(address _creator, string memory _name,string memory _symbol, uint256 _maxPocAmount, string memory _baseURI) public {
        Poc poc = new Poc(_creator,_name, _symbol, _maxPocAmount, _baseURI);
        uint256 index = creatorToPocIndex[_creator];
        creatorToPoc[_creator][index] = address(poc);
        creatorToPocIndex[_creator] = index + 1;
        emit NewPoc(_creator, _name, address(poc));
    }

    function getLastPocCreatedByCreator(address creator) public view returns (address) {
        uint256 index = creatorToPocIndex[creator];
        return creatorToPoc[creator][index-1];
    }
}