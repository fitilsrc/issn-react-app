import { gql } from "@apollo/client";

export const CREATE_PERSON_MUTATION = gql`
  mutation CreatePerson(
    $createdBy: String
    $birthday: String
    $deathday: String
    $birthPlace: String
  ) {
    createPerson(
      personInput: {
        createdBy: $createdBy
        birthday: $birthday
        deathday: $deathday
        birthPlace: $birthPlace
      }
    ) {
      id
    }
  }
`
