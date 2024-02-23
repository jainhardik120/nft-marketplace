"use client"

import NFTCard from "../components/NFTCard";
import useNFTMarket from "../state/nft-market";

export default function OwnedPage() {
  const { ownedNFTs, ownedListedNFTs } = useNFTMarket();

  return (
    <div>

      <div>
        {
          ownedNFTs?.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))
        }
      </div>
      <p>Owned Listed NFTs</p>
      <div>
        {
          ownedListedNFTs?.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))
        }
      </div>
    </div>
  );
}