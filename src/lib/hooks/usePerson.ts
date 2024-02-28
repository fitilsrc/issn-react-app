import { useToast } from "@/components/ui/use-toast";
import { useIssnContext } from "./useIssnContext";
import { useMutation } from "@apollo/client";
import { AliasType, DocumentType } from "../types/PersonType";
import {
  ADD_PSEUDONYM_MUTATION,
  CREATE_ALIAS_MUTATION,
  CREATE_DOCUMENT_MUTATION,
  CREATE_PERSON_MUTATION,
  DELETE_DOCUMENT_MUTATION,
  UPDATE_ALIAS_MUTATION,
  UPDATE_DOCUMENT_MUTATION
} from "../graphql";
import { useNavigate } from "react-router";
import { StatusType } from "../types/ResponseStatusType";

export function usePerson() {
  const { toast } = useToast();
  const { state } = useIssnContext();
  const navigate = useNavigate();

  const [updateAliasMutation] = useMutation(UPDATE_ALIAS_MUTATION);
  const [createAliasMutation] = useMutation(CREATE_ALIAS_MUTATION);
  const [createPersonMutation] = useMutation(CREATE_PERSON_MUTATION);
  const [addPseudonymMutation] = useMutation(ADD_PSEUDONYM_MUTATION);
  const [updateDocumentMutation] = useMutation(UPDATE_DOCUMENT_MUTATION);
  const [createDocumentMutation] = useMutation(CREATE_DOCUMENT_MUTATION);
  const [deleteDocumentMutation] = useMutation(DELETE_DOCUMENT_MUTATION);

  const addPseudonym = (personId: number, title: string) => {
    addPseudonymMutation({
      variables: {
        createdBy: state.user?.name,
        title,
        personId
      },
      onCompleted: () => {
        toast({
          variant: "default",
          title: "Person Pseudonym successfully created",
          description: "",
        });
      }
    })
  }

  const addPerson = () => {
    createPersonMutation({
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

  const createAlias = (alias: Partial<AliasType>) => {
    createAliasMutation({
      variables: {
        ...alias,
        createdBy: state.user?.name,
      },
      onCompleted: () => {
        toast({
          variant: "default",
          title: "Person alias successfully created",
          description: "",
        });
      }
    })
  }

  const updateAlias = (alias: AliasType) => {
    updateAliasMutation({
      variables: {
        ...alias,
        updatedBy: state.user?.name,
        documents: undefined
      },
      onCompleted: () => {
        toast({
          variant: "default",
          title: "Person alias successfully updated",
          description: "",
        });
      }
    })
  }

  const updateDocument = (document: DocumentType) => {
    updateDocumentMutation({
      variables: {
        ...document,
        updatedBy: state.user?.name,
      },
      onCompleted: () => {
        toast({
          variant: "default",
          title: "Document related to alias successfully updated",
          description: "",
        });
      }
    })
  }

  const createDocument = (document: DocumentType) => {
    createDocumentMutation({
      variables: {
        ...document,
        createdBy: state.user?.name,
      },
      onCompleted: () => {
        toast({
          variant: "default",
          title: "Document related to alias successfully created",
          description: "",
        });
      }
    })
  }

  const deleteDocument = (documentId: number) => {
    deleteDocumentMutation({
      variables: {
        documentId: parseInt(documentId.toString())
      },
      onCompleted: (data) => {
        toast({
          variant: "default",
          title: data.deleteDocument.status === StatusType.ERROR ? "An error occurred" : "Document successfully deleted",
          description: data.deleteDocument.status === StatusType.ERROR ? data.deleteDocument.message : "",
        });
      }
    })
  }

  return { updateAlias, createAlias, addPerson, addPseudonym, updateDocument, createDocument, deleteDocument }
}
