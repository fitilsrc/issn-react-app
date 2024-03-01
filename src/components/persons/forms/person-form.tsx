import { CalendarIcon, EditIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "react-router-dom";

// interface PersonFormProps {
//   mode?: boolean;
// }

export const PersonForm = () => {
  const { t } = useTranslation();
  const [isDeathPopover, setDeathPopover] = useState(false);
  const [isBirthPopover, setBirthPopover] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const formSchema = z.object({
    birthday: z.date().optional(),
    birthPlace: z.string().optional(),
    deathday: z.date().optional(),
    details: z.string().optional(),
    signs: z.string().optional(),
    nationality: z.string().optional(),
    gender: z.string().optional(),
    religion: z.string().optional(),
    ideology: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthPlace: "",
      details: "",
      signs: "",
      nationality: "",
      gender: "",
      religion: "",
      ideology: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSearchParams({mode: "plain"});
    console.log('[log] values', values)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div>{t("general_information")}</div>
          <Button variant="secondary" size="icon" onClick={() => setSearchParams({mode: "edit"})}>
            <EditIcon className="h-5 w-5" />
          </Button>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t("information")}</FormLabel>
                  <FormControl>
                    {searchParams.get("mode")==="plain" ? (
                      <Badge className="w-full px-4 py-4 text-center" variant="secondary">
                        {!field.value ? t("no-info") : field.value}
                      </Badge>
                    ):(
                      <Textarea
                        placeholder={t("type_details")}
                        className="resize-y"
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="signs"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t("signs")}</FormLabel>
                  <FormControl>
                    {searchParams.get("mode")==="plain" ? (
                      <Badge className="w-full px-4 py-4 text-center" variant="secondary">
                        {!field.value ? t("no-info") : field.value}
                      </Badge>
                    ):(
                      <Textarea
                        placeholder={t("type_details")}
                        className="resize-y"
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row gap-6 w-full">
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem className="w-1/2 flex flex-col">
                    <FormLabel>{t("date_of_birth")}</FormLabel>
                    {searchParams.get("mode")==="plain" ? (
                      <Badge className="w-full px-4 py-4 text-center" variant="secondary">
                        {!field.value ? t("no-info") : field.value.toLocaleDateString()}
                      </Badge>
                    ) : (
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
                                <span>{t("pick_date")}</span>
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
                              setBirthPopover(false);
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}

                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deathday"
                render={({ field }) => (
                  <FormItem className="w-1/2 flex flex-col">
                    <FormLabel>{t("date_of_death")}</FormLabel>
                    {searchParams.get("mode")==="plain" ? (
                      <Badge className="w-full px-4 py-4 text-center" variant="secondary">
                        {!field.value ? t("no-info") : field.value.toLocaleDateString()}
                      </Badge>
                    ) : (
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
                                <span>{t("pick_date")}</span>
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
                              setDeathPopover(false);
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-row gap-6 w-full">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="w-1/2 flex flex-col">
                    <FormLabel>{t("gender")}</FormLabel>
                    {searchParams.get("mode")==="plain" ? (
                      <Badge className="w-full px-4 py-4 text-center" variant="secondary">
                        {!field.value ? t("no-info") : field.value}
                      </Badge>
                    ) : (
                      <FormControl>
                        <Input placeholder={t("gender").toLowerCase()} {...field} />
                      </FormControl>
                    )}

                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthPlace"
                render={({ field }) => (
                  <FormItem className="w-1/2 flex flex-col">
                    <FormLabel>{t("place_of_birth")}</FormLabel>
                    {searchParams.get("mode")==="plain" ? (
                      <Badge className="w-full px-4 py-4 text-center" variant="secondary">
                        {!field.value ? t("no-info") : field.value}
                      </Badge>
                    ) : (
                      <FormControl>
                        <Input placeholder={t("place_of_birth").toLowerCase()} {...field} />
                      </FormControl>
                    )}
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-row gap-6 w-full">
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem className="w-1/2 flex flex-col">
                    <FormLabel>{t("nationality")}</FormLabel>
                    {searchParams.get("mode")==="plain" ? (
                      <Badge className="w-full px-4 py-4 text-center" variant="secondary">
                        {!field.value ? t("no-info") : field.value}
                      </Badge>
                    ) : (
                      <FormControl>
                        <Input placeholder={t("nationality").toLowerCase()} {...field} />
                      </FormControl>
                    )}
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="religion"
                render={({ field }) => (
                  <FormItem className="w-1/2 flex flex-col">
                    <FormLabel>{t("religion")}</FormLabel>
                    {searchParams.get("mode")==="plain" ? (
                      <Badge className="w-full px-4 py-4 text-center" variant="secondary">
                        {!field.value ? t("no-info") : field.value}
                      </Badge>
                    ) : (
                      <FormControl>
                        <Input placeholder={t("religion").toLowerCase()} {...field} />
                      </FormControl>
                    )}
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          {searchParams.get("mode")==="plain" ? null : (
            <CardFooter className="flex justify-end gap-4">
              <Button type="submit">{t("save")}</Button>
              <Button onClick={() => setSearchParams({mode: "plain"})}>{t("cancel")}</Button>
            </CardFooter>
          )}
        </form>
      </Form>
    </Card>
  );
};
