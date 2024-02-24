"use client"

import NFTCard from "../components/NFTCard";
import useNFTMarket from "../state/nft-market";

export default function OwnedPage() {
  const { ownedNFTs, ownedListedNFTs } = useNFTMarket();

  return (
    <div>
      <div className="flex flex-wrap gap-5 p-5 mx-auto">
        {
          ownedNFTs?.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))
        }
      </div>
      {(ownedListedNFTs && ownedListedNFTs.length > 0) && (
        <>
          <p>Owned Listed NFTs</p>
          <div>
            {
              ownedListedNFTs?.map((nft) => (
                <NFTCard key={nft.id} nft={nft} />
              ))
            }
          </div>
        </>
      )}
    </div>
  );
}