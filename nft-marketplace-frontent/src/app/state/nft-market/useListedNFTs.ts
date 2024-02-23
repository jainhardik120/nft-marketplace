import { gql, useQuery } from "@apollo/client";
import useSigner from "../signer";
import { NFT as mNFT } from "./interfaces";
import {formatEther} from "ethers";

type NFT = {
    __typename: "NFT";
    id: string;
    from: any;
    to: any;
    tokenURI: string;
    price: any;
}

type OwnedNFTs = {
    nfts: NFT[];
}

type OwnedNFTsVariables = {
    owner: string
}

const useListedNFTs = () => {
    const { address } = useSigner();
    const { data, error, loading } = useQuery<OwnedNFTs, OwnedNFTsVariables>(GET_OWNED_NFTS, { variables: { owner: address ?? "" }, skip: !address });
    const listedNFTs = data?.nfts.map((raw) => <mNFT>{
        id: raw.id,
        owner: raw.price == "0" ? raw.to : raw.from,
        price: raw.price == "0" ? "0" : formatEther(raw.price),
        tokenURI: raw.tokenURI,
    });
    return { listedNFTs };
}

const GET_OWNED_NFTS = gql`
    query GetOwnedNfts($owner : String!) {
        nfts(where : {from_not : $owner, price_not : "0"}) {
            id
            from
            to
            tokenURI
            price
        }
    }
`

export default useListedNFTs;