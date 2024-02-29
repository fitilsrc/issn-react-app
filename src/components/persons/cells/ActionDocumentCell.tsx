import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetPerson } from "@/lib/hooks/useGetPerson";
import { usePerson } from "@/lib/hooks/usePerson";
import { MoreVertical } from "lucide-react";
import { useParams } from "react-router-dom";

interface ActionDocumentCellProps {
  id?: number;
}

export const ActionDocumentCell = ({ id }: ActionDocumentCellProps) => {
  const { personId } = useParams();
  const { refetchPerson } = useGetPerson(parseInt(personId?.toString() ?? ""));
  const { deleteDocument } = usePerson();

  const handleDelete = async () => {
    id && await deleteDocument(id);
    refetchPerson();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
