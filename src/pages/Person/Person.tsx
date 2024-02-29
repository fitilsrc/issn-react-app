import { PersonView } from "@/components/persons/person-view";
import { useGetPerson } from "@/lib/hooks";
import { useParams } from "react-router";

const Person = () => {
  const { personId } = useParams();

  const {
    person,
    refetchPerson,
    error,
    loading,
  } = useGetPerson(parseInt(personId?.toString() ?? ""));

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <PersonView person={person.getPersonById} onPersonUpdate={refetchPerson} />
  );
};

export default Person;
