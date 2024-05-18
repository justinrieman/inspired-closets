'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExpectedArrivalDialogForm } from './ExpectedArrivalDialogForm';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit: (value: TData) => void;
}

const DataTableRowActions = <TData,>({
  row,
  onEdit,
}: DataTableRowActionsProps<TData>) => {
  const path = usePathname();
  // @ts-ignore
  const component = {
    // @ts-ignore
    _id: row.original._id,
    // @ts-ignore
    type: row.original.type,
    // @ts-ignore
    color: row.original.color,
    // @ts-ignore
    name: row.original.name,
    // @ts-ignore
    expectedArrival: row.original.expectedArrival,
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility

  const handleMarkAsOrdered = () => {
    setIsDialogOpen(true); // Open the dialog when "Mark As Ordered" is clicked
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-8 p-0 hover:bg-gray-200">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link href={path + '/' + component._id}>View Item</Link>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            Mark as Ordered
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger></DialogTrigger>
        <ExpectedArrivalDialogForm
          _id={component._id}
          type={component.type}
          name={component.name}
          color={component.color}
          expectedArrival={component.expectedArrival}
        />
      </Dialog>
    </>
  );
};

export default DataTableRowActions;
