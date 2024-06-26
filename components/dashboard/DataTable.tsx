'use client';
import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Input } from '@/components/ui/input';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="bg-gray-50 2xl:h-[calc(100vh-162px)] h-[calc(100vh-160px)] px-4 pb-4 mt-4 border rounded-md ">
      <div className="flex justify-between">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter name..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className=""
          />
        </div>
        <div className="flex items-center py-4 md:w-auto w-28">
          <Select
            onValueChange={(value) => {
              value === 'All'
                ? table.getColumn('quantity')?.setFilterValue('')
                : table.getColumn('quantity')?.setFilterValue(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="criticallyLow">Critically Low</SelectItem>

              <SelectItem value="overstocked">Overstocked</SelectItem>
              <SelectItem value="All">All Levels</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center py-4 md:w-auto w-28">
          {table.getAllColumns()[0].id === 'color' && (
            <Select
              onValueChange={(value) => {
                value === 'All'
                  ? table.getColumn('color')?.setFilterValue('')
                  : table.getColumn('color')?.setFilterValue(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="White">White</SelectItem>
                <SelectItem value="Morning Mist">Morning Mist</SelectItem>
                <SelectItem value="All">All</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      <div className="border-b h-5/6">
        <Table className="">
          <TableHeader className="sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="text-stone-50 bg-red-800"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-gray-50 overflow-scroll">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
