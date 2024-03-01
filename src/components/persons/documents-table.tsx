import { DocumentType } from "@/lib/types/PersonType";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { ActionDocumentCell } from "./cells/ActionDocumentCell";

interface DocumentsTableProps {
  documents?: DocumentType[];
}

const columns: ColumnDef<DocumentType>[] = [
  {
    accessorKey: "title",
    header: "Documents name",
    cell: ({ row }) => {
      const title = row.getValue("title");

      return <div>{`${title}`}</div>;
    },
  },
  {
    accessorKey: "series",
    header: "Series/Number",
    cell: ({ row }) => {
      const series = row.getValue("series");

      return <div>{`${series}`}</div>;
    },
  },
  {
    accessorKey: "issued",
    header: "Validity",
    cell: ({ row }) => {
      const issued = !row.getValue("issued")
        ? ""
        : new Date(row.getValue("issued")).toDateString();

      return <div>{`${issued}`}</div>;
    },
  },
  {
    id: "actions",
    size: 40,
    cell: ({ row }) => {
      const document = row.original;

      return <ActionDocumentCell id={document.id} />;
    },
  },
];

export const DocumentsTable = ({
  documents,
}: DocumentsTableProps) => {
  if (!documents) return "No documents";
  return (
    <DataTable columns={columns} data={documents} />
  );
};
