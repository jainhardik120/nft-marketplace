"use client"

import NFTCard from "../components/NFTCard";
import useNFTMarket from "../state/nft-market";

export default function OwnedPage() {
  const { ownedNFTs } = useNFTMarket();

  return (
    <div>
      {
        ownedNFTs?.map((nft) => (
          <NFTCard key={nft.id} nft={nft} />
        ))
      }
    </div>
  );
}