import { useQuery } from "@apollo/client";
import { GET_PERSONS_QUERY } from "../graphql";

export function useGetPersons() {
  const { data: persons, refetch: refetchPersons, error, loading } = useQuery(GET_PERSONS_QUERY);

  return { persons, refetchPersons, error, loading }
}
