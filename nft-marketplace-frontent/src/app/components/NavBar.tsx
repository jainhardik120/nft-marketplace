'use client'
import Link from 'next/link';
import useSigner from '../state/signer';
type NavButtonProps = {
  href: string;
  text: string;
}

export const btnClasses = "mx-1 p-2 text-white px-4";

const NavButton = (props: NavButtonProps) => {
  const { href, text } = props;
  return (
    <Link className={btnClasses} href={href}>{text}</Link>
  );
}

export default function NavBar() {
  const { address, connectWallet, loading } = useSigner();
  return (
    <div className='fixed top-0 w-full h-16 bg-black flex content-center items-center'>
      <div className='flex-auto h-fit'>
        <div className="w-fit h-fit mx-auto">
          <NavButton href="/" text="Home" />
          <NavButton href="/owned" text="Owned" />
          <NavButton href="/create" text="Create" />
        </div>
      </div>
      <button className={btnClasses}
        onClick={connectWallet} disabled={loading || (address !== undefined && address.length > 0)}
      >
        {address && (<p>{`${address.substring(0, 5)}....${address.substring(address.length - 3)}`}</p>)}
        {!address && "Connect Wallet"}
      </button>
    </div>
  )
}