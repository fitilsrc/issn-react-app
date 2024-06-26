import { AliasType, PersonType, PseudonymType } from "@/lib/types/PersonType";
import { ColumnDef } from "@tanstack/react-table";
import { ActionPersonCell, AliasesCell, PseudonymsCell } from "./cells";
import { DataTable } from "./data-table";

interface PersonsTableProps {
  persons: PersonType[];
}

const columns: ColumnDef<PersonType>[] = [
  {
    accessorKey: "id",
    header: "Person Id",
    cell: ({ row }) => {
      const id: number = row.getValue("id");
      return <div>{id}</div>;
    },
  },
  {
    accessorKey: "pseudonyms",
    header: "Pseudonyms",
    cell: ({ row }) => {
      const pseudonyms: Array<PseudonymType> = row.getValue("pseudonyms");

      return <PseudonymsCell pseudonyms={pseudonyms} />;
    },
  },
  {
    accessorKey: "aliases",
    header: "Aliases",
    size: 700,
    cell: ({ row }) => {
      const aliases: Array<AliasType> = row.getValue("aliases");

      return <AliasesCell aliases={aliases} />;
    },
  },
  {
    id: "actions",
    size: 40,
    cell: ({ row }) => {
      const person = row.original;

      return <ActionPersonCell id={person.id} isViewMode={true} />;
    },
  },
];

export const PersonsTable = ({ persons }: PersonsTableProps) => {
  return (
    <>
      <DataTable
        columns={columns}
        data={persons}
        isSearchEnabled={true}
      />
    </>
  );
};
