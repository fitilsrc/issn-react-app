import { gql } from "@apollo/client";

export const UPDATE_ALIAS_MUTATION = gql`
  mutation UpdateAlias(
    $id: ID
    $updatedBy: String
    $firstName: String
    $secondName: String
    $surname: String

    $citizenship: String

    $personId: Float!
  ) {
    updateAlias(
      aliasInput: {
        id: $id
        updatedBy: $updatedBy
        firstName: $firstName
        secondName: $secondName
        surname: $surname
        citizenship: $citizenship
        personId: $personId
      }
    ) {
      id
      firstName
      secondName
    }
  }
`
