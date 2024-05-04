import Link from 'next/link';
import CollapsibleLinks from './CollapsibleLinks';
import { Power } from 'lucide-react';
import Image from 'next/image';

const Sidenav = () => {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-red-800 p-4 md:h-40 md:justify-center md:items-center"
        href="/dashboard"
      >
        <Image
          src="/inspired-logo.svg"
          alt="Vercel Logo"
          width={120}
          height={100}
          priority
        />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <CollapsibleLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-200 hover:text-red-800 md:flex-none md:justify-start md:p-2 md:px-3">
            <Power className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidenav;
