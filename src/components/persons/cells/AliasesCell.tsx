import { Badge } from "@/components/ui/badge"
import { AliasType } from "@/lib/types/PersonType"

interface AliasesCellProps {
  aliases: AliasType[];
}

export const AliasesCell = ({
  aliases
}: AliasesCellProps) => {
  return (
    <div className="flex gap-2">
      {aliases.map((alias) => (
        <Badge
          className="w-fit bg-lime-600"
          key={`alias-${alias.id}`}
        >{`${alias.firstName} ${alias.secondName}`}</Badge>
      ))}
    </div>
  )
}
