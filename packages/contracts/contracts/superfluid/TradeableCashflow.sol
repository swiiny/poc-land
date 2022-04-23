// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import {RedirectAll, ISuperToken, IConstantFlowAgreementV1, ISuperfluid} from "./RedirectAll.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TradeableCashflow is ERC721, RedirectAll {

  // counter for nfts
  uint256 private _tokenIdCounter = 1;

  constructor (
    address owner,
    string memory _name,
    string memory _symbol,
    ISuperfluid host,
    ISuperToken acceptedToken
  )
    ERC721 ( _name, _symbol )
    RedirectAll (
      owner,
      host,
      acceptedToken
     )
    {
      _mint(owner, _tokenIdCounter);
      _tokenIdCounter++;
    }

  //now I will insert a nice little hook in the _transfer, including the RedirectAll function I need
  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 /*tokenId*/
  ) internal override {
      _changeReceiver(from, to);
  }

  function addReceiver(address receiver) public {
    _mint(receiver, _tokenIdCounter);
    _addReceiver(receiver, _tokenIdCounter);
    _tokenIdCounter++;
  }
}