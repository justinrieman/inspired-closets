'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { QuantityDialogForm } from '@/components/dashboard/inventory/QuantityDialogForm';

export type ShelvesInventory = {
  _id: string;
  type: string;
  name: string;
  color: string;
  quantity: number;
  maxQuantity: number;
  lastUpdated: string;
  expectedArrival: string;
};

export const columns: ColumnDef<ShelvesInventory>[] = [
  {
    accessorKey: 'color',
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Color
          <ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('color')}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('name')}</div>
    ),
  },

  {
    accessorKey: 'quantity',
    header: () => <div className="text-center">Quantity</div>,
    cell: ({ row }) => {
      const quantity = Number(row.getValue('quantity'));
      const maxQuantity = Number(row.getValue('maxQuantity'));
      const quantityPercent = (quantity / maxQuantity) * 100;

      let rowColor = '';

      if (quantityPercent <= 30) {
        rowColor = 'bg-red-300';
      } else if (quantityPercent <= 50) {
        rowColor = 'bg-orange-200';
      } else if (quantityPercent <= 70) {
        rowColor = 'bg-yellow-100';
      } else {
        rowColor = '';
      }

      const editQuantity = () => {
        //_id of item to edit quantity
        //TODO call updated component with _id in database
        // need to do this with a server function?
        const idToEdit = row.original._id;
      };

      return (
        <div className="text-center">
          <Dialog>
            <DialogTrigger>
              <div onClick={editQuantity} className={`py-1 px-5 ${rowColor}`}>
                {row.getValue('quantity')}
              </div>
            </DialogTrigger>
            <QuantityDialogForm
              _id={row.original._id}
              type={row.original.type}
              name={row.original.name}
              color={row.original.color}
              quantity={row.original.quantity}
            />
          </Dialog>
        </div>
      );
    },
  },
  {
    accessorKey: 'maxQuantity',
    header: () => <div className="text-center">Max Quantity</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('maxQuantity')}</div>
    ),
  },
  {
    accessorKey: 'lastUpdated',
    header: () => <div className="text-center">Last Updated</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('lastUpdated')}</div>
    ),
  },
  {
    accessorKey: 'expectedArrival',
    header: () => <div className="text-center">Expected Arrival</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('expectedArrival')}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // TODO: do something with this
      const rowInfo = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0 hover:bg-gray-200">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => console.log('hello')}>
              View Item
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mark As Ordered </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
