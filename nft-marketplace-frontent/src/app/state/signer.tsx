"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import {JsonRpcSigner, BrowserProvider} from "ethers";
import Web3Modal from "web3modal";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
type SignerContextType = {
  signer?: JsonRpcSigner;
  address?: string;
  loading: boolean;
  connectWallet: () => Promise<void>;
}

const SignerContext = createContext<SignerContextType>({} as any);

const client = new ApolloClient({ cache: new InMemoryCache(), uri: "https://api.studio.thegraph.com/query/66325/nft-marketplace/version/latest" })

const useSigner = () => useContext(SignerContext);

export const SignerProvider = ({ children }: { children: ReactNode }) => {
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [address, setAddress] = useState<string>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const web3modal = new Web3Modal();
    if (web3modal.cachedProvider) connectWallet();
    window.ethereum.on("accountsChanged", connectWallet);
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    try {
      const web3modal = new Web3Modal({ cacheProvider: true });
      const instance = await web3modal.connect();
      const provider = new BrowserProvider(instance);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setSigner(signer);
      setAddress(address);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const contextValue = { signer, address, loading, connectWallet };

  return (
    <SignerContext.Provider value={contextValue}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </SignerContext.Provider>
  );
}

export default useSigner;