import { useToast } from "@/components/ui/use-toast";
import { useIssnContext } from "./useIssnContext";
import { useMutation } from "@apollo/client";
import { AliasType } from "../types/PersonType";
import { CREATE_PERSON_MUTATION, UPDATE_ALIAS_MUTATION } from "../graphql";
import { useNavigate } from "react-router";

export function usePerson() {
  const { toast } = useToast();
  const { state } = useIssnContext();
  const navigate = useNavigate();
  const [update] = useMutation(UPDATE_ALIAS_MUTATION);
  const [create] = useMutation(CREATE_PERSON_MUTATION);

  const addPerson = () => {
    create({
      variables: {
        createdBy: state.user?.name,
      },
      onCompleted: (data) => {
        toast({
          variant: "default",
          title: "Person successfully created",
          description: "",
        });
        navigate(`/person/${data.createPerson.id}`);
      }
    })
  }

  const updatePerson = (alias: AliasType) => {
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
          description: "",
        });
      }
    })
  }

  return { updatePerson, addPerson }
}