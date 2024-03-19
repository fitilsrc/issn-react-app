import { PersonType } from "@/lib/types/PersonType";
import { FileUploadDialog, Separator } from "..";
import { PersonForm } from "./forms/person-form";
import { useTranslation } from "react-i18next";
import { AspectRatio } from "../ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PseudonymView } from "./pseudonym-view";
import { PseudonymDialogForm } from "./forms/pseudonym-dialog-form";
import { CreateAliasDialogForm } from "./forms/create-alias-dialog-form";
import { AliasCard } from "./alias-card-view";
import { useFileObject } from "@/lib/hooks/useFileObject";
import { useEffect } from "react";
import { DeleteDialog } from "../delete-dialog";

interface PersonViewProps {
  person: PersonType;
  onPersonUpdate?: () => void;
}

export const PersonView = ({ person, onPersonUpdate }: PersonViewProps) => {
  const { t } = useTranslation();
  const { getBundleOfPresignedUrls, presignedUrls, deleteFile } = useFileObject();
  const { pseudonyms, aliases, photos } = person;

  useEffect(() => {
    if (!photos) return;
    getBundleOfPresignedUrls(photos ?? []);
  }, [photos])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2>Person, registration number # XO-000-000</h2>
      </div>
      <Separator className="mt-4" />

      <div className="flex gap-6 w-full justify-start items-start">
        <div className="flex justify-center items-center w-full pr-6 pb-6 lg:w-1/3 lg:pr-0">
          <AspectRatio
            ratio={3 / 4}
            className="bg-muted flex justify-center items-center overflow-hidden relative"
          >
            {
              presignedUrls.length > 0 ? (
                <>
                  <img
                    src={`${presignedUrls.slice(-1)[0]?.url}`}
                    className="object-fill"
                  />
                  <DeleteDialog onConfirmHandle={() => deleteFile(presignedUrls.slice(-1)[0]?.filename)} />
                </>
              ):(
                <FileUploadDialog onPersonUpdate={onPersonUpdate}/>
              )
            }
          </AspectRatio>
        </div>

        <div className="flex flex-col gap-4 lg:w-2/3">

          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between items-center">
                  <h2>{t("pseudonyms")}</h2>
                  <PseudonymDialogForm onPersonUpdate={onPersonUpdate} />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PseudonymView pseudonyms={pseudonyms} onPersonUpdate={onPersonUpdate}/>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between items-center">
                  <h2>{t("also_known_as")}</h2>
                  <CreateAliasDialogForm onPersonUpdate={onPersonUpdate} />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {aliases &&
                aliases.map((alias) => (
                  <div
                    className="flex flex-row gap-4 h-fit items-stretch w-full"
                    key={`alias-${alias.id}`}
                  >
                    <AliasCard alias={alias} onPersonUpdate={onPersonUpdate} />
                  </div>
                ))
              }
            </CardContent>
          </Card>

          <PersonForm person={person} onPersonUpdate={onPersonUpdate}/>
        </div>
      </div>
    </div>
  );
};
