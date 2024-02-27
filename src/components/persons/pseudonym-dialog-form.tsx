import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusSquareIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useParams } from "react-router";
import { usePerson } from "@/lib/hooks/usePerson";

interface PseudonymDialogFormProps {
  onPersonUpdate?: () => void;
}

export const PseudonymDialogForm = ({ onPersonUpdate }: PseudonymDialogFormProps) => {
  const { personId } = useParams();
  const { addPseudonym } = usePerson();

  const formSchema = z.object({
    title: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    personId && await addPseudonym(parseInt(personId), values.title);
    onPersonUpdate?.();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlusSquareIcon className="h-5 w-5 mr-2" /> Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Pseudonym</FormLabel>
                  <FormControl>
                    <Input placeholder="pseudonym" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="submit">Add</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
