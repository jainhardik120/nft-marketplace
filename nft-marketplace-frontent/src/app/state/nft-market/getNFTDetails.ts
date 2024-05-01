import { gql, useQuery } from "@apollo/client";
import useSigner from "../signer";
import { NFTDetails } from "./interfaces";
import { formatEther } from "ethers";
import { rawNFTMapper } from "./helpers";

type NFTDetailsVariables = {
    id: string
}

const GetNFTDetails = (id : string) => {
    const { data, error, loading } = useQuery<NFTDetails, NFTDetailsVariables>(GET_NFT_DETAILS, { variables: { id: id ?? "" }, skip: !id });
    return { data };
}

const GET_NFT_DETAILS = gql`
    query GetNFTDetails($id : String!) {
        nft(id: $id) {
        id
        creator
        currentOwner
        tokenURI
        price
        isListed
        blockNumber
    }
    transfers_collection(where: { tokenId: $id }, orderBy: blockNumber, orderDirection: desc) {
        id
        from
        to
        tokenId
        blockNumber
        transactionHash
    }
    }
`

export default GetNFTDetails;