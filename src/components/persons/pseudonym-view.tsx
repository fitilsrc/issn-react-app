import { PseudonymType } from '@/lib/types';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { usePerson } from '@/lib/hooks';

interface PseudonymViewProps {
  pseudonyms?: PseudonymType[];
  onPersonUpdate?: () => void;
}

export const PseudonymView = ({ pseudonyms, onPersonUpdate }: PseudonymViewProps) => {
  const { deletePseudonym } = usePerson();

  const handleRemovePseudo = async (id?: number) => {
    id && await deletePseudonym(id);
    onPersonUpdate?.();
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
