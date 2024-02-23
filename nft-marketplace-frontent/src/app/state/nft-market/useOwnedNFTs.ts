import { gql, useQuery } from "@apollo/client";
import useSigner from "../signer";

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

const useOwnedNFTs = () => {
    const { address } = useSigner();
    const { data, error, loading } = useQuery<OwnedNFTs, OwnedNFTsVariables>(GET_OWNED_NFTS, { variables: { owner: address ?? "" }, skip: !address });
    const ownedNFTs = data?.nfts;
    return { ownedNFTs };
}

const GET_OWNED_NFTS = gql`
    query GetOwnedNfts($owner : String!) {
        nfts(where : {to : $owner, price : "0"}) {
            id
            from
            to
            tokenURI
            price
        }
    }
`

export default useOwnedNFTs;