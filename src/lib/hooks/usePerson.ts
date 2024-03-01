import { useToast } from "@/components/ui/use-toast";
import { useIssnContext } from "./useIssnContext";
import { useMutation } from "@apollo/client";
import {
  ADD_PSEUDONYM_MUTATION,
  CREATE_ALIAS_MUTATION,
  CREATE_DOCUMENT_MUTATION,
  CREATE_PERSON_MUTATION,
  DELETE_DOCUMENT_MUTATION,
  DELETE_PERSON_MUTATION,
  UPDATE_ALIAS_MUTATION,
  UPDATE_DOCUMENT_MUTATION,
  UPDATE_PERSON_MUTATION
} from "../graphql";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { AliasType, PersonType, StatusType } from "../types";
import { useGetPersons } from ".";

export function usePerson() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { state } = useIssnContext();
  const navigate = useNavigate();
  const { refetchPersons } = useGetPersons();

  const [updateAliasMutation] = useMutation(UPDATE_ALIAS_MUTATION);
  const [createAliasMutation] = useMutation(CREATE_ALIAS_MUTATION);
  const [createPersonMutation] = useMutation(CREATE_PERSON_MUTATION);
  const [addPseudonymMutation] = useMutation(ADD_PSEUDONYM_MUTATION);
  const [updateDocumentMutation] = useMutation(UPDATE_DOCUMENT_MUTATION);
  const [createDocumentMutation] = useMutation(CREATE_DOCUMENT_MUTATION);
  const [deleteDocumentMutation] = useMutation(DELETE_DOCUMENT_MUTATION);
  const [deletePersonMutation] = useMutation(DELETE_PERSON_MUTATION);
  const [updatePersonMutation] = useMutation(UPDATE_PERSON_MUTATION);

  const addPseudonym = async (personId: number, title: string) => {
    addPseudonymMutation({
      variables: {
        createdBy: state.user?.name,
        title,
        personId
      },
      onCompleted: () => {
        toast({
          variant: "default",
          title: t("add_pseudonym_toast_title"),
          description: "",
        });
      }
    })
  }

  const addPerson = async () => {
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
        refetchPersons();
        navigate(`/person/${data.createPerson.id}?mode=edit`);
      }
    })
  }

  const updatePerson = async (person: PersonType) => {
    updatePersonMutation({
      variables: {
        ...person,
        updatedBy: state.user?.name,
      },
      onCompleted: () => {
        toast({
          variant: "default",
          title: "Person successfully updated",
          description: "",
        });
      }
    })
  }

  const deletePerson = async (personId: number) => {
    deletePersonMutation({
      variables: {
        personId: parseInt(personId.toString())
      },
      onCompleted: (data) => {
        toast({
          variant: "default",
          title: data.deletePerson.status === StatusType.ERROR ? t("error_toast_title") : "Person successfully deleted",
          description: data.deletePerson.status === StatusType.ERROR ? data.deletePerson.message : "",
        });
        refetchPersons();
      }
    })
  }

  const createAlias = async (alias: Partial<AliasType>) => {
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

  const updateAlias = async (alias: AliasType) => {
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

  const updateDocument = async (document: DocumentType) => {
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

  const createDocument = async (document: DocumentType) => {
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

  const deleteDocument = async (documentId: number) => {
    deleteDocumentMutation({
      variables: {
        documentId: parseInt(documentId.toString())
      },
      onCompleted: (data) => {
        toast({
          variant: "default",
          title: data.deleteDocument.status === StatusType.ERROR ? t("error_toast_title") : "Document successfully deleted",
          description: data.deleteDocument.status === StatusType.ERROR ? data.deleteDocument.message : "",
        });
      }
    })
  }

  return { updateAlias, createAlias, addPerson, addPseudonym, updateDocument, createDocument, deleteDocument, deletePerson, updatePerson }
}
