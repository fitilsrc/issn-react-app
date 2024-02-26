import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

interface ActionCellProps {
  id?: number;
  isViewMode?: boolean;
}

export const ActionCell = ({ id, isViewMode }: ActionCellProps) => {
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
            <Link to={`/person/${id}`}>View</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
