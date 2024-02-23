"use client"

import { Contract } from "ethers";
import useSigner from "../signer"
import { TransactionResponse } from "@ethersproject/abstract-provider";
import MarketPlace from "../../../../artifacts/contracts/MarketPlace.json"
import useOwnedNFTs from "./useOwnedNFTs";

const useNFTMarket = () => {
    const { signer } = useSigner();
    const NFT_MARKET_ADDRESS: string = "0x2981430609e9cf9E6Cb660b6eCD7bb3E59C0cDAe";
    const contract = new Contract(NFT_MARKET_ADDRESS, MarketPlace.abi, signer);

    const {ownedNFTs} = useOwnedNFTs();

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

    return {
        createNFT, ownedNFTs
    }
}

export default useNFTMarket;