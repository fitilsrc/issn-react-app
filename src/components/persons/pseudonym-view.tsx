import { PseudonymType } from '@/lib/types';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface PseudonymViewProps {
  pseudonyms?: PseudonymType[];
}

export const PseudonymView = ({ pseudonyms }: PseudonymViewProps) => {

  const handleRemovePseudo = (id?: number) => {
    console.log("[log] pseudonym id", id);
  };

  return (
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
  )
}
