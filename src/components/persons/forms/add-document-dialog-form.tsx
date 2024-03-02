import { CalendarIcon, PlusSquareIcon } from "lucide-react";
import { usePerson } from "@/lib/hooks/usePerson";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover } from "@radix-ui/react-popover";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useTranslation } from "react-i18next";


interface AddDocumentDialogFormProps {
  aliasId?: number;
  onPersonUpdate?: () => void;
}

export const AddDocumentDialogForm = ({
  aliasId,
  onPersonUpdate
}: AddDocumentDialogFormProps) => {
  const { t } = useTranslation();
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
    aliasId && createDocument({
      ...values,
      aliasId: parseInt(aliasId.toString())
    } as unknown as DocumentType)
    onPersonUpdate?.();
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlusSquareIcon className="h-5 w-5 mr-2" /> {t("add")}
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
