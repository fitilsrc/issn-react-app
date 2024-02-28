import { gql } from "@apollo/client";

export const DELETE_DOCUMENT_MUTATION = gql`
  mutation DeleteDocument(
    $documentId: Float!
  ) {
    deleteDocument(
      documentId: $documentId
    ) {
      status
      message
    }
  }
`
