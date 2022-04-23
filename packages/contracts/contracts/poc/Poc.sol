// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { RedirectAll, ISuperToken, ISuperfluid } from "./RedirectAll.sol";

contract Poc is ERC721, RedirectAll {

    address public gasLessMinter;
    address public creator;
    uint256 public _tokenIdCounter;
    uint256 public maxPocAmount;
    string public baseURI;

    mapping(address => bool) public hasAPoc;

    constructor (
        address _gasLessMinter,
        address _creator,
        string memory _name,
        string memory _symbol,
        uint256 _maxPocAmount,
        string memory _baseURI,
        ISuperfluid host,
        ISuperToken acceptedToken
    )
        ERC721(_name, _symbol)
        RedirectAll (host, acceptedToken)
    {
        gasLessMinter = _gasLessMinter;
        creator = _creator;
        maxPocAmount = _maxPocAmount;
        baseURI = _baseURI;
        _tokenIdCounter = 1;
    }

    function setGasLessMinter(address _gasLessMinter) public {
        require(msg.sender == gasLessMinter);
        gasLessMinter = _gasLessMinter;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 /*tokenId*/
    ) internal override {
        _changeReceiver(from, to);
    }

    function safeMint(address to) public {
        require(msg.sender == gasLessMinter);
        require(hasAPoc[to] == false, "This address already has a Poc");
        require(_tokenIdCounter < maxPocAmount, "Max Poc amount reached");
        _safeMint(to, _tokenIdCounter);
        _addReceiver(to, _tokenIdCounter);
        _tokenIdCounter++;
        hasAPoc[to] = true;
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        // require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return baseURI;
    }
}
