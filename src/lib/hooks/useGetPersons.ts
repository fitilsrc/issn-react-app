import { gql, useQuery } from "@apollo/client";

const GET_PERSONS = gql`
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
        birthday
        birthPlace
      }
    }
  }
`;

export function useGetPersons() {
  const { data: persons, refetch: refetchPersons, error, loading } = useQuery(GET_PERSONS);

  return { persons, refetchPersons, error, loading }
}
