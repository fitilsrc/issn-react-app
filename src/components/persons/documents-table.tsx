import { DocumentType } from "@/lib/types/PersonType";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ColumnDef } from "@tanstack/react-table";
import { ActionCell } from "./cells";
import { DataTable } from "./data-table";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { AddDocumentDialogForm } from "./add-document-dialog-form";

interface DocumentsTableProps {
  aliasId?: number;
  documents?: DocumentType[];
  onPersonUpdate?: () => void;
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

      return <ActionCell id={document.id} />;
    },
  },
];

export const DocumentsTable = ({
  documents,
  aliasId,
  onPersonUpdate,
}: DocumentsTableProps) => {
  if (!documents) return "No documents";
  return (
    <Card className="h-full relative">
      <CardHeader className="pb-0"></CardHeader>
      <CardContent>
        <ScrollArea className="w-full h-full whitespace-nowrap">
          <div className="flex w-full space-x-4">
            <DataTable columns={columns} data={documents} />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <AddDocumentDialogForm
          aliasId={aliasId}
          onPersonUpdate={onPersonUpdate}
        />
      </CardFooter>
    </Card>
  );
};
