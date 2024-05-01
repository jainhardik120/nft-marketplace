export type NFT = {
  id: string;
  owner: string;
  price: string;
  tokenURI: string;
};

export type RawNFT = {
  __typename: "NFT";
  id: string;
  creator: any;
  currentOwner: any;
  tokenURI: string;
  price: BigInt | null;
  blockNumber: BigInt;
}

export type RawNFTs = {
  nfts: RawNFT[];
}

export type RawTransfer = {
  id: string;
  from: any;
  to: any;
  tokenId: string;
  blockNumber: BigInt;
  transactionHash: string;
}


export type NFTDetails = {
  nft: RawNFT;
  transfers_collection: RawTransfer[];
}