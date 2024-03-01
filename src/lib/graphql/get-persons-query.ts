import { gql } from "@apollo/client";

export const GET_PERSONS_QUERY = gql`
  query {
    getPersons {
      id
      pseudonyms {
        id
        title
      }
      aliases {
        id
        firstName
        secondName
        surname
      }
    }
  }
`;