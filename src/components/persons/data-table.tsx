"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusSquareIcon } from "lucide-react";
import { usePerson } from "@/lib/hooks/usePerson";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isSearchEnabled?: boolean;
  updatePersons?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isSearchEnabled,
  updatePersons
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { addPerson } = usePerson();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    defaultColumn: {
      size: 200,
      minSize: 50,
      maxSize: 500,
    },
  });

  const handleAddPerson = async () => {
    await addPerson();
    updatePersons?.();
  }

  return (
    <div className="w-full">
      {isSearchEnabled && (
        <div className="flex justify-between items-center py-4">
          <Input
            placeholder="Filter aliases..."
            value={
              (table.getColumn("aliases")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("aliases")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Button variant="secondary" onClick={handleAddPerson}>
            <PlusSquareIcon className="h-5 w-5 mr-2" /> Add Person
          </Button>
        </div>
      )}
      <div className="w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
