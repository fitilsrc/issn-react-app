import { gql } from "@apollo/client";

export const DELETE_PSEUDONYM_MUTATION = gql`
  mutation DeletePseudonym(
    $pseudonymId: Float!
  ) {
    deletePseudonym(
      pseudonymId: $pseudonymId
    ) {
      status
      message
    }
  }
`
