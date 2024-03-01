import { gql } from "@apollo/client";

export const UPDATE_PERSON_MUTATION = gql`
  mutation UpdatePerson(
    $id: ID
    $updatedBy: String
    $birthday: String
    $deathday: String
    $birthPlace: String
    $gender: String
    $details: String
    $signs: String
    $nationality: String
    $religion: String
    $ideology: String
  ) {
    updatePerson(
      personInput: {
        id: $id
        updatedBy: $updatedBy
        birthday: $birthday
        deathday: $deathday
        birthPlace: $birthPlace
        gender: $gender
        details: $details
        signs: $signs
        nationality: $nationality
        religion: $religion
        ideology: $ideology
      }
    ) {
      id
    }
  }
`
