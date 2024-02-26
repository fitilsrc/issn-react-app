import { PersonType } from "@/lib/types/PersonType"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface PersonFormProps {
  person: PersonType;
}

export const PersonForm = ({
  person
}: PersonFormProps) => {

  // const { pseudonyms, aliases } = person;

  const formSchema = z.object({
    username: z.string().min(2).max(50),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  return (
    <Form {...form}>
      <div className="flex justify-start flex-col gap-4">
        <div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pseudonyms</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="submit">Save</Button>
          <Button>Delete</Button>
        </div>
      </div>
    </Form>
  )
}
