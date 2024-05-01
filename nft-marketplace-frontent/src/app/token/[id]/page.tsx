"use client"

import { useEffect } from "react";
import useNFTMarket from "../../state/nft-market";



const Page = ({ params }: { params: { id: string } }) => {
  const { nftDetails } = useNFTMarket();
  const { data } = nftDetails(params.id);

  const copyToClipboard = async (text : string)=>{
    try {
      await navigator.clipboard.writeText(text);
      console.log("Copied")
    } catch (error) {
      console.log("Error" + error);
    }
  }

  return (
    <div className="p-4">
      {data && data.transfers_collection.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Transaction Hash</th>
              <th className="py-2 px-4 border-b">From</th>
              <th className="py-2 px-4 border-b">To</th>
              <th className="py-2 px-4 border-b">Block Number</th>
            </tr>
          </thead>
          <tbody>
            {data.transfers_collection.map((transfer) => (
              <tr key={transfer.transactionHash} className="border-b">
                <td className="py-2 px-4">
                  <div title={transfer.transactionHash}>
                    <a href={`https://sepolia.etherscan.io/tx/${transfer.transactionHash}`} target="_blank">{transfer.transactionHash.substring(0, 10) + "..." + transfer.transactionHash.substring(transfer.transactionHash.length - 10)}</a>
                  </div>
                </td>
                <td>
                  <div title={transfer.from}>
                    <a href={`https://sepolia.etherscan.io/address/${transfer.from}`} target="_blank">{transfer.from.substring(0, 10) + "..." + transfer.from.substring(transfer.from.length - 10)}</a>
                  </div>
                </td>
                <td>
                  <div title={transfer.to}>
                    <a href={`https://sepolia.etherscan.io/address/${transfer.to}`} target="_blank">{transfer.to.substring(0, 10) + "..." + transfer.to.substring(transfer.to.length - 10)}</a>
                  </div>
                </td>
                <td>
                  <div>
                    <a href={`https://sepolia.etherscan.io/block/${transfer.blockNumber}`} target="_blank">{transfer.blockNumber.toString()}</a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No transfers available.</p>
      )}
    </div>
  )
}

export default Page;