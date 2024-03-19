import { z } from "zod";
import { Button } from "./ui/button";
import { Folder, UploadCloud } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useFileObject } from "@/lib/hooks/useFileObject";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

interface FileUploadDialogProps {
  onPersonUpdate?: () => void;
}

const formSchema = z.object({
  files: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, `Required`),
});

export const FileUploadDialog = ({ onPersonUpdate }: FileUploadDialogProps) => {
  const { t } = useTranslation();
  const { personId } = useParams();
  const { uploadFile, addPersonPhoto } = useFileObject();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: undefined,
    },
  });

  const fileRef = form.register("files");

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await uploadFile(data.files);
    personId && await addPersonPhoto({
      filename: data.files[0].name,
      bucket: "photo",
      personId: parseInt(personId)
    })
    onPersonUpdate?.();
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="default" className="h-full w-full">
          <UploadCloud className="w-8 h-8" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-8">{t("upload_your_file_here")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="files"
                render={() => (
                  <FormItem className="relative">
                    <Folder className="text-muted-foreground absolute left-2 bottom-2 w-5 h-5"/>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        className={cn(
                          "inline-block leading-7 hover:cursor-pointer file:hidden pl-10",
                        )}
                        {...fileRef}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button type="submit">Upload</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
