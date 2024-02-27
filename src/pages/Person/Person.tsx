import { PersonView } from "@/components/persons/person-view";
import { GET_PERSON_BY_ID_QUERY } from "@/lib/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";

const Person = () => {
  const { personId } = useParams();

  const {
    data: person,
    refetch: refetchPerson,
    error,
    loading,
  } = useQuery(GET_PERSON_BY_ID_QUERY, {
    variables: { personId },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <PersonView person={person.getPersonById} onPersonUpdate={refetchPerson} />
  );
};

export default Person;
