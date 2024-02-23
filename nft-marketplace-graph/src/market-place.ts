import { MarketPlace, NFTTransfer as NFTTransferEvent } from "../generated/MarketPlace/MarketPlace"
import { NFT } from "../generated/schema"

export function handleNFTTransfer(event: NFTTransferEvent): void {
  const nftMarket = MarketPlace.bind(event.address);
  const tokenURI = nftMarket.tokenURI(event.params.tokenID);
  const entity = new NFT(event.params.tokenID.toString());
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenURI = tokenURI;
  entity.price = event.params.price;
  entity.save();
}