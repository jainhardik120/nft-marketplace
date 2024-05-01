import { gql, useQuery } from "@apollo/client";
import useSigner from "../signer";
import { RawNFT, RawNFTs, NFT as mNFT } from "./interfaces";
import { formatEther } from "ethers";
import { rawNFTMapper } from "./helpers";


type OwnedNFTsVariables = {
    owner: string
}

const useOwnedListedNFTs = () => {
    const { address } = useSigner();
    const { data, error, loading } = useQuery<RawNFTs, OwnedNFTsVariables>(GET_OWNED_NFTS, { variables: { owner: address ?? "" }, skip: !address });
    const ownedNFTs = data?.nfts.map(rawNFTMapper);
    return { ownedListedNFTs: ownedNFTs };
}

const GET_OWNED_NFTS = gql`
    query GetOwnedNfts($owner : String!) {
        nfts(where : {currentOwner : $owner, isListed : true}) {
            id
        creator
        currentOwner
        tokenURI
        price
        blockNumber
        }
    }
`

export default useOwnedListedNFTs;