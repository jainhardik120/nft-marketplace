import { BigInt } from "@graphprotocol/graph-ts";
import { MarketPlace, NFTTransfer as NFTTransferEvent } from "../generated/MarketPlace/MarketPlace"
import { NFT, Transfers } from "../generated/schema"

export function handleNFTTransfer(event: NFTTransferEvent): void {
  const nftMarket = MarketPlace.bind(event.address);
  const tokenURI = nftMarket.tokenURI(event.params.tokenID);
  let nft = NFT.load(event.params.tokenID.toString());
  if (nft == null) {
    nft = new NFT(event.params.tokenID.toString())
    nft.creator = event.params.to;
    nft.tokenURI = tokenURI;
    nft.currentOwner = event.params.to;
  }
  const zeroBigInt = new BigInt(0);
  if (event.params.price != zeroBigInt) {
    nft.isListed = true;
    nft.price = event.params.price;
  } else {
    nft.currentOwner = event.params.to;
    nft.price = null;
    nft.isListed = false;
  }
  nft.blockNumber=event.block.number;
  nft.save();
  let transfer = new Transfers(event.transaction.hash.concatI32(event.logIndex.toI32()));
  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.tokenId = event.params.tokenID;
  transfer.blockNumber = event.block.number;
  transfer.transactionHash = event.transaction.hash;
  transfer.save();
}