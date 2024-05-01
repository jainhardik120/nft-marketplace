import { formatEther, BigNumberish } from "ethers";
import { RawNFT, NFT } from "./interfaces";

export const ipfsToHTTPS = (url: string) => {
    //if (!url.startsWith("ipfs://")) throw new Error("Not an IPFS url");
    const cid = url.substring(7);
    return `https://ipfs.io/ipfs/${cid}`;
};

export const minifyAddress = (address: string) => {
    const start = address.substring(0, 5);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
};

export const rawNFTMapper = (raw: RawNFT) => {
    return <NFT>{
        id: raw.id,
        owner: raw.currentOwner,
        price: raw.price==null ? "0" : formatEther(raw.price.valueOf()),
        tokenURI: raw.tokenURI,
    }
}