import { gql } from "@apollo/client";

export const UPDATE_DOCUMENT_MUTATION = gql`
  mutation UpdateDocument(
    $id: ID
    $updatedBy: String
    $title: String
    $series: String
    $issued: String
    $aliasId: Float!
  ) {
    updateDocument(
      documentInput: {
        id: $id
        updatedBy: $updatedBy
        title: $title
        series: $series
        issued: $issued
        aliasId: $aliasId
      }
    ) {
      id
    }
  }
`
