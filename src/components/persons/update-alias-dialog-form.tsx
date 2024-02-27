import { AliasType } from "@/lib/types/PersonType"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CalendarIcon, EditIcon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { usePerson } from "@/lib/hooks/usePerson";

interface UpdateAliasFormProps {
  alias?: AliasType;
  onPersonUpdate?: () => void;
}

export const UpdateAliasDialogForm = ({
  alias,
  onPersonUpdate
}: UpdateAliasFormProps) => {
  const [isDeathPopover, setDeathPopover] = useState(false);
  const [isBirthPopover, setBirthPopover] = useState(false);
  const { updateAlias } = usePerson();

  const formSchema = z.object({
    firstName: z.string().min(2).max(50).optional(),
    secondName: z.string().optional(),
    surname: z.string().optional(),
    birthday: z.date().optional(),
    deathday: z.date().optional(),
    birthPlace: z.string().optional(),
    citizenship: z.string().optional(),
    gender: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: alias?.firstName ?? "",
      secondName: alias?.secondName ?? "",
      surname: alias?.surname ?? "",
      birthday: !alias?.birthday ? undefined : new Date(alias.birthday),
      deathday: !alias?.deathday ? undefined : new Date(alias.deathday),
      birthPlace: alias?.birthPlace ?? "",
      citizenship: alias?.citizenship ?? "",
      gender: alias?.gender ?? "",
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
        <Button variant="secondary">
          <EditIcon className="h-5 w-5 mr-2" /> Edit
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
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Input placeholder="gender" {...field} />
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
                  name="birthday"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover open={isBirthPopover} onOpenChange={setBirthPopover}>
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
                            onSelect={(value) => {
                              field.onChange(value);
                              setBirthPopover(false);
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
                <FormField
                  control={form.control}
                  name="deathday"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Date of death</FormLabel>
                      <Popover open={isDeathPopover} onOpenChange={setDeathPopover}>
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
                            onSelect={(value) => {
                              field.onChange(value);
                              setDeathPopover(false);
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
              </div>

              <div className="flex flex-row gap-2 w-full">
                <FormField
                  control={form.control}
                  name="birthPlace"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Place of birth</FormLabel>
                      <FormControl>
                        <Input placeholder="Place of Birth" {...field} />
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
