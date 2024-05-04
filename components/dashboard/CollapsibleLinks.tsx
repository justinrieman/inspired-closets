'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { Boxes, Home, Users } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import SubLink from './SubLink';

const links = [
  { name: 'Home', href: '/dashboard', subLinks: [], icon: Home },
  {
    name: 'Inventory',
    href: '#',
    subLinks: [
      { name: 'Components', href: '/dashboard/inventory/components' },
      { name: 'Hardware', href: '/dashboard/inventory/hardware' },
    ],
    icon: Boxes,
  },
  {
    name: 'Customers',
    href: '#',
    subLinks: [
      { name: 'Upcoming Jobs', href: '#' },
      { name: 'Follow-up', href: '#' },
    ],
    icon: Users,
  },
];

const CollapsibleLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link key={link.name} href={link.href} className="rounded-md w-full">
            <Collapsible>
              <CollapsibleTrigger
                className={clsx(
                  'flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-200 hover:text-red-800 md:flex-none md:justify-start md:p-2 md:px-3',
                  {
                    'bg-red-200 text-red-800': pathname === link.href,
                  }
                )}
              >
                <LinkIcon className="w-5" />
                <p className="hidden md:block">{link.name}</p>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col w-full">
                  {link.subLinks.map((subLink) => (
                    <SubLink
                      key={subLink.name}
                      name={subLink.name}
                      href={subLink.href}
                    />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Link>
        );
      })}
    </>
  );
};

export default CollapsibleLinks;
