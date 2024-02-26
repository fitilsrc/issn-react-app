import { Badge } from "@/components/ui/badge";
import { PseudonymType } from "@/lib/types/PersonType"

interface PseudonymsCellProps {
  pseudonyms: PseudonymType[];
}

export const PseudonymsCell = ({
  pseudonyms
}: PseudonymsCellProps) => {
  return (
    <div className="flex gap-2">
      {pseudonyms.map((pseudonym) => (
        <Badge className="w-fit bg-teal-600" key={`alias-${pseudonym.id}`}>
          {pseudonym.title}
        </Badge>
      ))}
    </div>
  )
}
