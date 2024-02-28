import { CalendarIcon, PlusSquareIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "../ui/dialog";
import { usePerson } from "@/lib/hooks/usePerson";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Popover } from "@radix-ui/react-popover";
import { useState } from "react";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

interface AddDocumentDialogFormProps {
  aliasId?: number;
  onPersonUpdate?: () => void;
}

export const AddDocumentDialogForm = ({
  aliasId,
  onPersonUpdate
}: AddDocumentDialogFormProps) => {
  const { createDocument } = usePerson();
  const [isIssuedPopover, setIssuedPopover] = useState(false)

  const formSchema = z.object({
    title: z.string().optional(),
    series: z.string().optional(),
    issued: z.date().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      series: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    aliasId && await createDocument({
      ...values,
      aliasId: parseInt(aliasId.toString())
    });
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
                  <FormLabel>Document title</FormLabel>
                  <FormControl>
                    <Input placeholder="document title" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="series"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Document series</FormLabel>
                  <FormControl>
                    <Input placeholder="document series" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issued"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Date of death</FormLabel>
                  <Popover open={isIssuedPopover} onOpenChange={setIssuedPopover}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        required={false}
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown-buttons"
                            fromYear={1900}
                            toYear={2023}
                        onSelect={(value) => {
                          field.onChange(value);
                          setIssuedPopover(false);
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="submit">Add document</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
