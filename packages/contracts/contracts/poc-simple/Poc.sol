// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Poc is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint256 public maxPocAmount;
    string public baseURI;
    address public creator;

    mapping(address => bool) public hasAPoc;

    constructor(address _creator, string memory _name,string memory _symbol, uint256 _maxPocAmount, string memory _baseURI) ERC721(_name, _symbol) {
        creator = _creator;
        maxPocAmount = _maxPocAmount;
        baseURI = _baseURI;
        // TODO : remove this
        safeMint(creator);
    }

    function safeMint(address to) public {
        require(hasAPoc[to] == false, "This address already has a Poc");
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId < maxPocAmount, "Max Poc amount reached");
        _tokenIdCounter.increment();
        hasAPoc[to] = true;
        _safeMint(to, tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        // require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        // uint256 tokenId = 12;
        // string memory baseURI = _baseURI();
        return baseURI;
    }
}
