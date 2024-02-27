import { PersonsTable } from "@/components/persons/persons-table";
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
      documents {
        id
        title
        issued
        series
      }
    }
  }
`;

const Persons = () => {
  const { data, refetch, error, loading } = useQuery(GET_PERSONS);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <section className="flex py-6 gap-6">
      <PersonsTable persons={data.getPersons} updatePersons={refetch} />
    </section>
  );
};

export default Persons;
