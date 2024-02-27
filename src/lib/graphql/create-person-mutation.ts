import { gql } from "@apollo/client";

export const CREATE_PERSON_MUTATION = gql`
  mutation CreatePerson(
    $createdBy: String
  ) {
    createPerson(
      personInput: {
        createdBy: $createdBy
      }
    ) {
      id
    }
  }
`
