import { gql } from "@apollo/client";

export const CREATE_DOCUMENT_MUTATION = gql`
  mutation CreateDocument(
    $createdBy: String
    $title: String
    $series: String
    $issued: String
    $aliasId: Float!
  ) {
    createDocument(
      documentInput: {
        createdBy: $createdBy
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
