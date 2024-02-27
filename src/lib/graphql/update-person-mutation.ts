import { gql } from "@apollo/client";

export const UPDATE_PERSON_MUTATION = gql`
  mutation UpdateAlias(
    $id: ID
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
    updateAlias(
      aliasInput: {
        id: $id
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
      firstName
      secondName
    }
  }
`
