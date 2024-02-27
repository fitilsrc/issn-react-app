import { PersonType } from "@/lib/types/PersonType"
import { PlusSquareIcon, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { AliasCard } from "./alias-card";
import { DocumentsTable } from "./documents-table";
import { Separator } from "..";

interface PersonViewProps {
  person: PersonType;
  onPersonUpdate?: () => void;
}

export const PersonView = ({ person, onPersonUpdate }: PersonViewProps) => {

  const { pseudonyms, aliases } = person;

  const handleRemovePseudo = (id?: number) => {
    console.log('[log] pseudonym id', id)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2>Person, registration number # XO-000-000</h2>
      </div>
      <Separator className="mt-8"/>
      <div className="flex justify-between items-center">
        <h2>Pseudonyms </h2>
        <Button variant="secondary">
          <PlusSquareIcon className="h-5 w-5 mr-2" />
          Add nick
        </Button>
      </div>
      <div className="w-fit flex gap-2">
        {pseudonyms &&
          pseudonyms.map((pseudonym) => (
            <Badge
              variant="secondary"
              className="flex gap-2"
              key={`pseudonym-${pseudonym.id}`}
            >
              {pseudonym.title}
              <Button
                variant="secondary"
                size="icon"
                className="w-4 h-4 rounded-full"
                onClick={() => handleRemovePseudo(pseudonym.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
      </div>
      <Separator className="mt-8"/>
      <div className="flex justify-between items-center">
      <h2>Also known as</h2>
        <Button variant="secondary">
          <PlusSquareIcon className="h-5 w-5 mr-2" />
          Add alias
        </Button>
      </div>
      {aliases &&
        aliases.map((alias) => (
          <div
            className="flex flex-row gap-4 h-fit items-stretch w-full"
            key={`alias-${alias.id}`}
          >
            <div className="w-1/2">
              <AliasCard alias={alias} onPersonUpdate={onPersonUpdate}/>
            </div>
            <div className="w-1/2">
              <DocumentsTable documents={alias.documents} />
            </div>
          </div>
        ))}
    </div>
  );
};
