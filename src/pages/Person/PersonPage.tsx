import { Loader } from "@/components";
import { PersonView } from "@/components/persons/person-view";
import { useGetPerson } from "@/lib/hooks";
import { useParams } from "react-router";
import { Error } from "@/components";

const PersonPage = () => {
  const { personId } = useParams();

  const {
    person,
    refetchPerson,
    error,
    loading,
  } = useGetPerson(parseInt(personId?.toString() ?? ""));

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <PersonView person={person.getPersonById} onPersonUpdate={refetchPerson} />
  );
};

export default PersonPage;
