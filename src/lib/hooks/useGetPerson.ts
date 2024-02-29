import { useQuery } from "@apollo/client";
import { GET_PERSON_BY_ID_QUERY } from "../graphql";

export function useGetPerson(personId: number) {
  const {
    data: person,
    refetch: refetchPerson,
    error,
    loading,
  } = useQuery(GET_PERSON_BY_ID_QUERY, {
    variables: { personId },
  });

  return { person, refetchPerson, error, loading }
}
