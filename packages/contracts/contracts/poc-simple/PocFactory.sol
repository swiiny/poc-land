// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Poc.sol";

contract PocFactory {
    mapping(address => uint256) creatorToPocIndex;
    mapping(address => mapping(uint256 => address)) creatorToPoc;

    event NewPoc(address creator, string name, address poc);

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
        uint256 currentIndex = creatorToPocIndex[_creator]+1;
        creatorToPoc[_creator][currentIndex] = address(poc);
        creatorToPocIndex[_creator] = currentIndex + 1;
        emit NewPoc(_creator, _name, address(poc));
    }

    function getLastPocCreatorIndex(address creator) public view returns (uint256) {
        return creatorToPocIndex[creator];
    }

    function getPocWithCreatorIndex(address creator, uint256 index) public view returns (address) {
        return creatorToPoc[creator][index];
    }
}