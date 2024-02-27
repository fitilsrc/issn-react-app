import { gql } from "@apollo/client";

export const ADD_PSEUDONYM_MUTATION = gql`
  mutation AddPseudonym(
    $createdBy: String
    $title: String
    $personId: Float!
  ) {
    createPseudonym(
      pseudonymInput: {
        createdBy: $createdBy
        title: $title
        personId: $personId
      }
    ) {
      id
    }
  }
`
