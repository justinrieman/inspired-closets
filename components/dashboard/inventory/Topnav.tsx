'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const componentsList = [
  { name: 'Shelves', href: '/dashboard/inventory/components/shelves' },
  { name: 'Verticals', href: '/dashboard/inventory/components/verticals' },
  { name: 'Fronts', href: '/dashboard/inventory/components/fronts' },
  { name: 'Tops', href: '/dashboard/inventory/components/tops' },
  { name: 'Beds', href: '/dashboard/inventory/components/beds' },
  { name: 'Trim', href: '/dashboard/inventory/components/trim' },
  { name: 'Boxes', href: '/dashboard/inventory/components/boxes' },
  { name: 'Glides', href: '/dashboard/inventory/components/glides' },
];

const Topnav = () => {
  const pathname = usePathname();
  return (
    <div className="flex w-full gap-2 mt-6">
      {componentsList.map((component) => {
        return (
          <Link
            key={component.name}
            href={component.href}
            className={clsx(
              'flex justify-center items-center text-sm bg-gray-50 w-full rounded-md h-10 hover:bg-red-200 hover:text-red-800',
              { 'bg-red-200 text-red-800': pathname === component.href }
            )}
          >
            {component.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Topnav;
