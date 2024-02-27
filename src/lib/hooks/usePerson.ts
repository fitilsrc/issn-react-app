import { useToast } from "@/components/ui/use-toast";
import { useIssnContext } from "./useIssnContext";
import { useMutation } from "@apollo/client";
import { UPDATE_PERSON_MUTATION } from "../graphql/update-person-mutation";
import { AliasType } from "../types/PersonType";

export function usePerson() {
  const { toast } = useToast()
  const { state } = useIssnContext()
  const [update] = useMutation(UPDATE_PERSON_MUTATION);

  const updatePerson = (alias: AliasType) => {
    console.log('[updated] alias', alias)
    update({
      variables: {
        ...alias,
        updatedBy: state.user?.name,
        documents: undefined
      },
      onCompleted: (data) => {
        toast({
          variant: "default",
          title: "Person alias successfully updated",
          description: "All session data has been deleted from the local system",
        });
      }
    })
  }

  return { updatePerson }
}