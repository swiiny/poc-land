// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { RedirectAll, ISuperToken, ISuperfluid } from "./RedirectAll.sol";

contract Poc is ERC721, RedirectAll {

    address private gasLessMinter = 0xE84132Be566a83988501a1eA134DeC5992ea0aaE;
    address private creator;
    uint256 private maxPocAmount = 50;
    uint256 private _tokenIdCounter;
    string private baseURI;

    mapping(address => bool) private hasAPoc;

    ISuperfluid host;
    ISuperToken acceptedToken;

    constructor (
        string memory _name,
        string memory _symbol,
        string memory _baseURI
    )
        ERC721(_name, _symbol)
        RedirectAll (host, acceptedToken)
    {
        baseURI = _baseURI;
        _tokenIdCounter = 1;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 /*tokenId*/
    ) internal override {
        _changeReceiver(from, to);
    }

    function safeMint(address to) public {
        require(msg.sender == gasLessMinter, "401");
        require(!hasAPoc[to], "hasAPoc");
        require(_tokenIdCounter < maxPocAmount, "maxPoc");
        _safeMint(to, _tokenIdCounter);
        _addReceiver(to, _tokenIdCounter);
        _tokenIdCounter = _tokenIdCounter+1;
        hasAPoc[to] = true;
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        return baseURI;
    }
}
