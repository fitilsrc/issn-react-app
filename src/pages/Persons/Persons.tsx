import { PersonsTable } from "@/components/persons/persons-table";
import { useGetPersons } from "@/lib/hooks";

const Persons = () => {
  const {persons, refetchPersons, loading, error} = useGetPersons();

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <section className="flex py-6 gap-6">
      <PersonsTable persons={persons.getPersons} updatePersons={refetchPersons} />
    </section>
  );
};

export default Persons;
