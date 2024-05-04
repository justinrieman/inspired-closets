'use client';

import { CirclePlus } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

type Props = {
  name: string;
  href: string;
};

const SubLink = ({ name, href }: Props) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      // className="md:mt-2 flex h-[36px] w-full items-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-200 hover:text-red-800 md: justify-between md:p-2 md:pl-10 md:pr-6"
      className={clsx(
        'md:mt-2 flex h-[36px] w-full items-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-200 hover:text-red-800 md: justify-between md:p-2 md:pl-10 md:pr-6',
        {
          'bg-red-200 text-red-800': pathname === href,
        }
      )}
    >
      {name}
      <CirclePlus className="w-4" />
    </Link>
  );
};

export default SubLink;
