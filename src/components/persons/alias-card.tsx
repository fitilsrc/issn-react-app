import { AliasType } from "@/lib/types/PersonType";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Image, EditIcon, Trash2 } from "lucide-react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { AliasDialogForm } from "./alias-dialog-form";

interface AliasCardProps {
  alias: AliasType;
  onPersonUpdate?: () => void;
}

export const AliasCard = ({ alias, onPersonUpdate }: AliasCardProps) => {
  return (
    <Card className="w-full h-fit">
      <div className="flex flex-col justify-start items-start lg:flex-row">
        <div className="flex justify-center items-center w-full p-6 lg:w-1/3 lg:pr-0">
          <AspectRatio
            ratio={3 / 4}
            className="bg-muted flex justify-center items-center"
          >
            <Image className="self-center w-8 h-8" />
          </AspectRatio>
        </div>

        <div className="w-full lg:w-2/3">
          <CardHeader>
            <CardTitle>{`${alias.firstName} ${alias.surname ?? ""} ${
              alias.secondName
            }`}</CardTitle>
            {alias.description && (
              <CardDescription>{alias.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {alias.gender && (
                <div className="flex flex-row items-center gap-2">
                  <div className="text-sm font-medium leading-none w-1/2">{`Gender:`}</div>
                  <div className="text-sm text-muted-foreground">
                    {alias.gender}
                  </div>
                </div>
              )}
              {alias.birthday && (
                <div className="flex flex-row items-center gap-2">
                  <div className="text-sm font-medium leading-none w-1/2">{`Was born:`}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(alias.birthday).toDateString()}
                  </div>
                </div>
              )}
              {alias.birthPlace && (
                <div className="flex flex-row items-center gap-2">
                  <div className="text-sm font-medium leading-none w-1/2">{`Place of birth:`}</div>
                  <div className="text-sm text-muted-foreground">
                    {alias.birthPlace}
                  </div>
                </div>
              )}
              {alias.deathday && (
                <div className="flex flex-row items-center gap-2">
                  <div className="text-sm font-medium leading-none w-1/2">{`Date of death:`}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(alias.deathday).toDateString()}
                  </div>
                </div>
              )}
              {alias.citizenship && (
                <div className="flex flex-row items-center gap-2">
                  <div className="text-sm font-medium leading-none w-1/2">{`Citizenship:`}</div>
                  <div className="text-sm text-muted-foreground">
                    {alias.citizenship}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 items-center justify-end pt-6">
            <AliasDialogForm alias={alias} onPersonUpdate={onPersonUpdate}/>
            <Button variant="destructive">
              <Trash2 className="h-5 w-5 mr-2" /> Delete
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};
