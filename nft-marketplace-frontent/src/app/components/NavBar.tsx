'use client'
import Link from 'next/link';
import ConnectButton from './ConnectButton';

type NavButtonProps = {
  href: string;
  text: string;
}

const NavButton = (props: NavButtonProps) => {
  const { href, text } = props;
  return (
    <Link className='m-2 p-2 rounded-lg bg-black text-white ' href={href}>{text}</Link>
  );
}

export default function NavBar() {
  return (
    <div className='flex'>
      <div className='flex-1'>
        <div className="pt-4 w-fit h-fit mx-auto">
          <NavButton href="/" text="Home" />
          <NavButton href="/owned" text="Owned" />
          <NavButton href="/create" text="Create" />
        </div>
      </div>
      <ConnectButton />
    </div>
  )
}