"use client"

import { Contract, ethers } from "ethers";
import useSigner from "../signer"
import MarketPlace from "../../../../artifacts/contracts/MarketPlace.json"
import useOwnedNFTs from "./useOwnedNFTs";
import useOwnedListedNFTs from "./useOwnedListedNFTs";
import useListedNFTs from "./useListedNFTs";
import { BigNumberish, TransactionResponse, parseEther } from "ethers";
import { NFT } from "./interfaces";
import GetNFTDetails from "./getNFTDetails";

const useNFTMarket = () => {
    const { signer } = useSigner();
    const NFT_MARKET_ADDRESS: string = "0x2981430609e9cf9E6Cb660b6eCD7bb3E59C0cDAe";
    const contract = new Contract(NFT_MARKET_ADDRESS, MarketPlace.abi, signer);

    const {ownedNFTs} = useOwnedNFTs();
    const {ownedListedNFTs} = useOwnedListedNFTs();
    const {listedNFTs} = useListedNFTs();

    const nftDetails = GetNFTDetails;

    const createNFT = async (values: FormData) => {
        try {
            const response = await fetch('/api/upload-nft', {
                method: 'POST',
                body: values,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Final NFT Link:', result.finalLink);
                const transaction: TransactionResponse = await contract.createToken(result.finalLink);
                await transaction.wait();
            } else {
                console.error('Error uploading NFT');
            }

        } catch (error) {
            console.log(error);
        }
    }

    const listNFT = async(id : string, price : BigNumberish) =>{
        try {
            const transaction : TransactionResponse = await contract.listNFT(parseInt(id), price);
            await transaction.wait();
        } catch (error) {
            console.log(error);
        }
    }

    const cancelListing = async(id : string)=>{
        try {
            const transaction : TransactionResponse = await contract.cancelListing(parseInt(id));
            await transaction.wait();
        } catch (error) {
            console.log(error);
        }
    }

    const buyNFT = async (nft : NFT) =>{
        try {
            console.log(parseEther(nft.price));
            const transaction : TransactionResponse = await contract.buyNFT(nft.id, {value : parseEther(nft.price)})
            await transaction.wait();
        } catch (error) {
            console.log(error);
        }
    }

    return {
        createNFT, ownedNFTs, listNFT, ownedListedNFTs, cancelListing, listedNFTs, buyNFT, nftDetails
    }
}

export default useNFTMarket;