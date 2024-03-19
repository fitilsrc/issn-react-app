import { gql } from "@apollo/client";

export const GET_PERSON_BY_ID_QUERY = gql`
  query GetPersonById(
    $personId: Float!
  ) {
    getPersonById(
      personId: $personId
    ) {
      id
      createdAt
      updatedAt
      createdBy
      updatedBy
      birthday
      deathday
      birthPlace
      gender
      details
      signs
      nationality
      religion
      ideology
      pseudonyms {
        id
        createdAt
        updatedAt
        createdBy
        updatedBy
        title
        personId
      }
      aliases {
        id
        createdAt
        updatedAt
        createdBy
        updatedBy
        firstName
        secondName
        surname
        citizenship
        description
        personId
        documents {
          id
          createdAt
          updatedAt
          createdBy
          updatedBy
          title
          series
          issued
          aliasId
        }
      }
      photos {
        id
        createdAt
        updatedAt
        createdBy
        updatedBy
        filename
        uri
        personId
      }
    }
  }
`
