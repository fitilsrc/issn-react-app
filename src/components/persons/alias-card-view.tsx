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
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DocumentsTable } from "./documents-table";
import { AddDocumentDialogForm } from "./forms/add-document-dialog-form";
import { usePerson } from "@/lib/hooks";
import { UpdateAliasDialogForm } from "./forms/update-alias-dialog-form";

interface AliasCardProps {
  alias: AliasType;
  onPersonUpdate?: () => void;
}

export const AliasCard = ({ alias, onPersonUpdate }: AliasCardProps) => {
  const { t } = useTranslation();
  const { deleteAlias } = usePerson();

  const handleDelete = async () => {
    alias.id && await deleteAlias(alias.id);
    onPersonUpdate?.();
  }

  return (
    <Card className="w-full h-full">
      <div className="flex flex-col justify-start h-full lg:flex-row">
        <div className="w-full h-full">
          <CardHeader>
            <CardTitle className="flex justify-between gap-4 items-center">
              <div>
                {`${alias.firstName} ${alias.surname ?? ""} ${alias.secondName}`}
              </div>
              <div className="flex gap-4 items-center">
                <UpdateAliasDialogForm alias={alias} onPersonUpdate={onPersonUpdate}/>
                <Button variant="destructive" size="icon" onClick={handleDelete}>
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </CardTitle>

            {alias.description && (
              <CardDescription>{alias.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {alias.citizenship && (
                <div className="flex flex-row items-center gap-2">
                  <div className="text-sm font-medium leading-none">{`${t("citizenship")}:`}</div>
                  <div className="text-sm text-muted-foreground">
                    {alias.citizenship}
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium leading-none">{`${t("documents")}:`}</div>
                <DocumentsTable documents={alias.documents} />
                <AddDocumentDialogForm aliasId={alias.id} onPersonUpdate={onPersonUpdate}/>
              </div>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </div>
      </div>
    </Card>
  );
};
