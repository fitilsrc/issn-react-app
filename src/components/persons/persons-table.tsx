import { AliasType, PersonType, PseudonymType } from "@/lib/types/PersonType";
import { ColumnDef } from "@tanstack/react-table";
import { ActionCell, AliasesCell, PseudonymsCell } from "./cells";
import { DataTable } from "./data-table";

interface PersonsTableProps {
  persons: PersonType[];
  updatePersons?: () => void;
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

      return <ActionCell id={person.id} isViewMode={true} />;
    },
  },
];

export const PersonsTable = ({ persons, updatePersons }: PersonsTableProps) => {
  return (
    <>
      <DataTable
        columns={columns}
        data={persons}
        isSearchEnabled={true}
        updatePersons={updatePersons}
      />
    </>
  );
};
