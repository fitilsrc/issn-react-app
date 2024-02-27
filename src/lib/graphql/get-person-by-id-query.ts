import { gql } from "@apollo/client";

export const GET_PERSON_BY_ID_QUERY = gql`
  query GetPersonById(
    $personId: ID!
  ) {
    getPersonById(
      personInput: {
        id: $personId
      }
    ) {
      id
      pseudonyms {
        id
        title
      }
      aliases {
        id
        createdBy
        firstName
        secondName
        surname
        birthday
        deathday
        birthPlace
        citizenship
        gender
        personId
        documents {
          id
          title
          series
          issued
        }
      }
    }
  }
`
