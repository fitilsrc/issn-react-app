import { gql } from "@apollo/client";

export const CREATE_ALIAS_MUTATION = gql`
  mutation CreateAlias(
    $updatedBy: String
    $firstName: String
    $secondName: String
    $surname: String
    $birthday: String
    $deathday: String
    $birthPlace: String
    $citizenship: String
    $gender: String
    $personId: Float!
  ) {
    createAlias(
      aliasInput: {
        updatedBy: $updatedBy
        firstName: $firstName
        secondName: $secondName
        surname: $surname
        birthday: $birthday
        deathday: $deathday
        birthPlace: $birthPlace
        citizenship: $citizenship
        gender: $gender
        personId: $personId
      }
    ) {
      id
    }
  }
`
