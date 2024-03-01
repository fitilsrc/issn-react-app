import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetPersons, usePerson } from "@/lib/hooks";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

interface ActionPersonCellProps {
  id?: number;
  isViewMode?: boolean;
}

export const ActionPersonCell = ({ id, isViewMode }: ActionPersonCellProps) => {
  const { deletePerson } = usePerson();

  const handleDelete = async () => {
    id && await deletePerson(id)
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
        {!isViewMode ? (
          <DropdownMenuItem>Edit</DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link to={`/person/${id}?mode=plain`} className="w-full">View</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
