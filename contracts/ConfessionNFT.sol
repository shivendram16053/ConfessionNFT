// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract ConfessionNFT is ERC721URIStorage {
    uint256 private _tokenIds;
    event NFTMinted(address indexed owner, uint256 indexed tokenId, string tokenUri);


    string baseSvg =
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 350 350' style='background: linear-gradient(to bottom, #8e8c8b, #383736)'>"
        "<defs><style>.base { fill: #000000; font-family: Arial, sans-serif; font-size: 24px; }</style></defs>"
        "<rect width='100%' height='100%' fill='url(#grad1)'/>"
        "<text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    constructor() ERC721("ConfessionNFTs", "CNT") {}

    function mintConfessionNFT(
        address recipient,
        string memory confession,
        string memory feelings,
        string memory title
    ) public returns (uint256) {
        uint256 newItemId = _tokenIds;

        // Construct the SVG with user confession and feelings
        string memory finalSvg = string(
            abi.encodePacked(baseSvg, title, "</text></svg>")
        );

        // Construct the JSON metadata
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": " ',
                        title,
                        ' ", "description": " ',
                        confession,
                        '", "attributes": [',
                        '{"trait_type": "Feelings", "value": "',
                        feelings,
                        '"}], ',
                        '"image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        // Prepend the data URI scheme to our base64 encoded JSON
        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        // Mint the NFT
        _tokenIds += 1;
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, finalTokenUri);

        // Emit event
        emit NFTMinted(recipient, newItemId, finalTokenUri);


        return newItemId;
    }
}
