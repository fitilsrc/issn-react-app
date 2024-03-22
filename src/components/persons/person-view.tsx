import { PersonType } from "@/lib/types/PersonType";
import { Separator } from "..";
import { PersonForm } from "./forms/person-form";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PseudonymView } from "./pseudonym-view";
import { PseudonymDialogForm } from "./forms/pseudonym-dialog-form";
import { CreateAliasDialogForm } from "./forms/create-alias-dialog-form";
import { AliasCard } from "./alias-card-view";
import { MediaCarousel } from "../media/media-carousel";

interface PersonViewProps {
  person: PersonType;
  onPersonUpdate?: () => void;
}

export const PersonView = ({ person, onPersonUpdate }: PersonViewProps) => {
  const { t } = useTranslation();
  const { pseudonyms, aliases, photos } = person;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-between items-start">
        <h2>{`Person, id # ${person.id}`}</h2>
        <h3 className="text-muted-foreground">{`registration number # ${
            person.uuid ?? t("not_added")
          }`}
        </h3>
      </div>
      <Separator className="mt-4" />

      <div className="flex gap-6 w-full justify-start items-start">
        <div className="flex flex-col justify-center items-center w-full pr-6 pb-6 lg:w-1/3 lg:pr-0">
          <MediaCarousel onPersonUpdate={onPersonUpdate} media={photos ?? []} />
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
              <PseudonymView
                pseudonyms={pseudonyms}
                onPersonUpdate={onPersonUpdate}
              />
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
                ))}
            </CardContent>
          </Card>

          <PersonForm person={person} onPersonUpdate={onPersonUpdate} />
        </div>
      </div>
    </div>
  );
};
