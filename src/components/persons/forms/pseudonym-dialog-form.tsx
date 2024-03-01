import { PlusSquareIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router";
import { usePerson } from "@/lib/hooks/usePerson";
import { useTranslation } from "react-i18next";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface PseudonymDialogFormProps {
  onPersonUpdate?: () => void;
}

export const PseudonymDialogForm = ({ onPersonUpdate }: PseudonymDialogFormProps) => {
  const { t } = useTranslation();
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
                  <FormLabel>{t("pseudonym")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("pseudonym").toLowerCase()} {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
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
