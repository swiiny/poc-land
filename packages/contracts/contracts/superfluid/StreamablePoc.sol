// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import {RedirectAll, ISuperToken, IConstantFlowAgreementV1, ISuperfluid} from "./RedirectAll.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
contract StreamablePoc is ERC721, Ownable, RedirectAll {

    uint256 private _tokenIdCounter = 1;
    uint256 public maxPocAmount;
    string public baseURI;
    address public creator;
    mapping(address => bool) public hasAPoc;

    constructor(
      address _creator,
      string memory _name,
      string memory _symbol,
      uint256 _maxPocAmount,
      string memory _baseURI,
      ISuperfluid host,
      ISuperToken acceptedToken
      )
      ERC721(_name, _symbol)
      RedirectAll (
      _creator,
      host,
      acceptedToken
    )
    {
        creator = _creator;
        maxPocAmount = _maxPocAmount;
        baseURI = _baseURI;
        // TODO : remove this
        safeMint(creator);
    }

    function safeMint(address to) public {
      require(hasAPoc[to] == false, "This address already has a Poc");
      require(_tokenIdCounter < maxPocAmount, "Max Poc amount reached");
      _tokenIdCounter = _tokenIdCounter + 1;
      hasAPoc[to] = true;
      _safeMint(to, _tokenIdCounter);
      _addReceiver(to, _tokenIdCounter);
    }

    //now I will insert a nice little hook in the _transfer, including the RedirectAll function I need
    function _beforeTokenTransfer(
      address from,
      address to,
      uint256 /*tokenId*/
    ) internal override {
        _changeReceiver(from, to);
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        return baseURI;
    }
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}