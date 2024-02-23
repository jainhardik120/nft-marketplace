import useSigner from "../state/signer"

export default function ConnectButton() {
    const { address, loading, connectWallet } = useSigner();
    return (
        <button onClick={connectWallet} disabled={loading}>
            {loading ? "busy..." : "Connect Wallet"}
        </button>
    )
}