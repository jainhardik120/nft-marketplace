"use client"

import useNFTMarket from "./state/nft-market";
import NFTCard from "./components/NFTCard";

export default function Home() {
  const {listedNFTs} = useNFTMarket();
  return (
    <div>
      <div>
        {
          listedNFTs?.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))
        }
      </div>
    </div>
  );
}