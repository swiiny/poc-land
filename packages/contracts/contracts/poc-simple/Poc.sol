// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import { RedirectAll, ISuperToken, ISuperfluid } from "./RedirectAll.sol";

contract Poc is ERC721, RedirectAll, Ownable {

    uint256 public _tokenIdCounter;
    uint256 public maxPocAmount;
    string public baseURI;
    address public creator;

    mapping(address => bool) public hasAPoc;

    constructor (
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
        creator = _creator;
        maxPocAmount = _maxPocAmount;
        baseURI = _baseURI;
        _tokenIdCounter = 1;
    }

    function safeMint(address to) public {
        require(hasAPoc[to] == false, "This address already has a Poc");
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        require(tokenId < maxPocAmount, "Max Poc amount reached");
        hasAPoc[to] = true;
        _safeMint(to, tokenId);
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        // require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return baseURI;
    }
}
