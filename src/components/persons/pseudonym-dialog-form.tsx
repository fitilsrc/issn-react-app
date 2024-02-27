import { PseudonymType } from "@/lib/types/PersonType"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusSquareIcon } from "lucide-react";

export const PseudonymDialogForm = () => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlusSquareIcon className="h-5 w-5 mr-2" /> Add nickname
        </Button>
      </DialogTrigger>
      <DialogContent>

      </DialogContent>
    </Dialog>
  )
}
