 //SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CryptoLucha is ERC721, ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint public constant MAX_SUPPLY = 10;
    uint public PRICE = 0.01 ether;
    uint public constant MAX_PER_MINT = 5;

    string public baseTokenURI;

    modifier maxSupply(uint _count){
      uint totalMinted = _tokenIdCounter.current();
      require( totalMinted.add(_count) <= MAX_SUPPLY, "Not enough NFTs!"); 
      _;
    }
    modifier maxMint(uint _count){
      require( _count > 0 && _count <= MAX_PER_MINT, "Cannot mint specified number of NFTs.");
      _;
    }

    modifier price(uint _count){
      require( msg.value >= PRICE.mul(_count), "Not enough ether to purchase NFTs.");
      _;
    }


    constructor(string memory baseURI) ERC721("CryptoLucha", "CLU") {
      setBaseURI(baseURI);
    }

    function mintNFTs(uint _count) public payable maxSupply(_count) price(_count) maxMint(_count){
       for (uint i = 0; i < _count; i++) {
              _mintSingleNFT();
       }
    }
    function _mintSingleNFT() private {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    function getTokensByOwner(address _owner) external view returns (uint[] memory){
      uint tokenCount = balanceOf(_owner);
      uint[] memory tokensId = new uint256[](tokenCount);
      for (uint i = 0; i < tokenCount; i++) {
        tokensId[i] = tokenOfOwnerByIndex(_owner, i);
      }
     return tokensId;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
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
}
