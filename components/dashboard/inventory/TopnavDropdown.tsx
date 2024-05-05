'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ItemProps = {
  label: string;
  items: string[];
};

const TopnavDropdown = ({ items, label }: ItemProps) => {
  console.log(items);
  console.log(label);
  const pathname = usePathname();
  const splitPathname = pathname.split('/');
  const lastWordOfPathname = splitPathname[splitPathname.length - 1];
  const lastWordOfPathnameUpper =
    lastWordOfPathname.charAt(0).toUpperCase() + lastWordOfPathname.slice(1);
  const [position, setPosition] = React.useState(lastWordOfPathname);
  return (
    <div className="mt-4 flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            {lastWordOfPathnameUpper}
            <ChevronDown className="pl-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {items.map((item) => {
              return (
                <Link
                  key={item}
                  href={`/dashboard/inventory/components/${item}`}
                >
                  <DropdownMenuRadioItem value={item}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </DropdownMenuRadioItem>
                </Link>
              );
            })}
            {/* <Link href="/dashboard/inventory/components/shelves">
              <DropdownMenuRadioItem value="shelves">
                Shelves
              </DropdownMenuRadioItem>
            </Link>
            <Link href="/dashboard/inventory/components/verticals">
              <DropdownMenuRadioItem value="verticals">
                Verticals
              </DropdownMenuRadioItem>
            </Link>
            <Link href="/dashboard/inventory/components/fronts">
              <DropdownMenuRadioItem value="fronts">
                Fronts
              </DropdownMenuRadioItem>
            </Link>
            <Link href="/dashboard/inventory/components/tops">
              <DropdownMenuRadioItem value="tops">Tops</DropdownMenuRadioItem>
            </Link>
            <Link href="/dashboard/inventory/components/beds">
              <DropdownMenuRadioItem value="beds">Beds</DropdownMenuRadioItem>
            </Link>
            <Link href="/dashboard/inventory/components/trim">
              <DropdownMenuRadioItem value="trim">Trim</DropdownMenuRadioItem>
            </Link>
            <Link href="/dashboard/inventory/components/boxes">
              <DropdownMenuRadioItem value="boxes">Boxes</DropdownMenuRadioItem>
            </Link>
            <Link href="/dashboard/inventory/components/glides">
              <DropdownMenuRadioItem value="glides">
                Glides
              </DropdownMenuRadioItem>
            </Link> */}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TopnavDropdown;
