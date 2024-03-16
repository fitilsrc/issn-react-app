import { z } from "zod";
import { Button } from "./ui/button";
import { UploadCloud } from "lucide-react";
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

const formSchema = z.object({
  files: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, `Required`),
});

export const FileUploadDialog = () => {
  const { uploadFile } = useFileObject();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: undefined,
    },
  });

  const fileRef = form.register("files");

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await uploadFile(data.files);
    if (res) form.reset();
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
          <DialogTitle className="mb-8">Upload your file here</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="files"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="file"
                        className={cn(
                          "inline-block leading-7 hover:cursor-pointer before:mr-3 before:text-muted-foreground before:w-fit file:hidden",
                          `before:content-['${"test"}']`
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
