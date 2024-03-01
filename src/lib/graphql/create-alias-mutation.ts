import { gql } from "@apollo/client";

export const CREATE_ALIAS_MUTATION = gql`
  mutation CreateAlias(
    $updatedBy: String
    $firstName: String
    $secondName: String
    $surname: String
    $citizenship: String
    $personId: Float!
  ) {
    createAlias(
      aliasInput: {
        updatedBy: $updatedBy
        firstName: $firstName
        secondName: $secondName
        surname: $surname
        citizenship: $citizenship
        personId: $personId
      }
    ) {
      id
    }
  }
`
