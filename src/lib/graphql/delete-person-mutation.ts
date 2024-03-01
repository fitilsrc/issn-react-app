import { gql } from "@apollo/client";

export const DELETE_PERSON_MUTATION = gql`
  mutation DeletePerson(
    $personId: Float!
  ) {
    deletePerson(
      personId: $personId
    ) {
      status
      message
    }
  }
`
