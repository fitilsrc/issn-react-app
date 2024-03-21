import { AliasType } from "@/lib/types/PersonType";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from "lucide-react";
import { usePerson } from "@/lib/hooks/usePerson";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface UpdateAliasFormProps {
  alias?: AliasType;
  onPersonUpdate?: () => void;
}

export const UpdateAliasDialogForm = ({
  alias,
  onPersonUpdate
}: UpdateAliasFormProps) => {
  const { updateAlias } = usePerson();

  const formSchema = z.object({
    firstName: z.string().min(2).max(50).optional(),
    secondName: z.string().optional(),
    surname: z.string().optional(),
    citizenship: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: alias?.firstName ?? "",
      secondName: alias?.secondName ?? "",
      surname: alias?.surname ?? "",
      citizenship: alias?.citizenship ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    alias && await updateAlias({
      ...values,
      id: alias.id,
      personId: alias.personId
    });
    onPersonUpdate?.();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <EditIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

              <div className="flex flex-row gap-2 w-full">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="first name" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="secondName"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Second Name</FormLabel>
                      <FormControl>
                        <Input placeholder="second name" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-row gap-2 w-full">
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Surname</FormLabel>
                      <FormControl>
                        <Input placeholder="surname" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-row gap-2 w-full">
                <FormField
                  control={form.control}
                  name="citizenship"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Citizenship</FormLabel>
                      <FormControl>
                        <Input placeholder="citizenship" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">Save changes</Button>
                </DialogClose>
              </DialogFooter>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
