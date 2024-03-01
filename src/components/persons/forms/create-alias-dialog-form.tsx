
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusSquareIcon } from "lucide-react";
import { usePerson } from "@/lib/hooks/usePerson";
import { useParams } from "react-router";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

interface CreateAliasFormProps {
  onPersonUpdate?: () => void;
}

export const CreateAliasDialogForm = ({
  onPersonUpdate
}: CreateAliasFormProps) => {
  const { t } = useTranslation();
  const { personId } = useParams();
  const { createAlias } = usePerson();

  const formSchema = z.object({
    firstName: z.string().min(2).max(50).optional(),
    secondName: z.string().optional(),
    surname: z.string().optional(),
    citizenship: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      secondName: "",
      surname: "",
      citizenship: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    personId && await createAlias({
      ...values,
      personId: parseInt(personId)
    });
    onPersonUpdate?.();
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

              <div className="flex flex-row gap-2 w-full">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>{t("first_name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("first_name").toLowerCase()} {...field} />
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
                      <FormLabel>{t("second_name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("second_name").toLowerCase()} {...field} />
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
                      <FormLabel>{t("middle_name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("middle_name")} {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="citizenship"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>{t("citizenship")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("citizenship")} {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button type="submit">{t("add")}</Button>
                </DialogClose>
              </DialogFooter>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
