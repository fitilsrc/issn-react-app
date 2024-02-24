import { AliasType, PersonType, PseudonymType } from '@/lib/types/PersonType';
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from './persons-data-table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreVertical } from 'lucide-react';
import { Badge } from '../ui/badge';

interface PersonsTableProps {
  persons: PersonType[];
}

const columns: ColumnDef<PersonType>[] = [
  {
    accessorKey: "id",
    header: "Person Id",
    cell: ({ row }) => {
      const id: number = row.getValue("id");
      return <div>{id}</div>
    }
  },
  {
    accessorKey: "pseudonyms",
    header: "Pseudonyms",
    cell: ({ row }) => {
      const pseudonyms: Array<PseudonymType> = row.getValue("pseudonyms");
      return (
        <div className="flex gap-2">
          {pseudonyms.map((pseudonym) => (
            <Badge className="w-fit bg-teal-600" key={`alias-${pseudonym.id}`}>
              {pseudonym.title}
            </Badge>
          ))}
        </div>
      );
    }
  },
  {
    accessorKey: "aliases",
    header: "Aliases",
    size: 700,
    cell: ({ row }) => {
      const aliases: Array<AliasType> = row.getValue("aliases");
      return (
        <div className="flex gap-2">
          {aliases.map((alias) => (
            <Badge
              className="w-fit bg-lime-600"
              key={`alias-${alias.id}`}
            >{`${alias.firstName} ${alias.secondName}`}</Badge>
          ))}
        </div>
      );
    }
  },
  {
    id: "actions",
    size: 40,
    cell: ({ row }) => {
      const person = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(person.id?.toString() ?? "")}
            >
              View (Edit)
            </DropdownMenuItem>
            <DropdownMenuItem>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

export const PersonsTable = ({ persons }: PersonsTableProps) => {

  return (
    <>
      <DataTable columns={columns} data={persons}/>
    </>
  )
}
