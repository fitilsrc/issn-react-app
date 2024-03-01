import { PersonsTable } from "@/components/persons/persons-table";
import { useGetPersons } from "@/lib/hooks";

const Persons = () => {
  const {persons, loading, error} = useGetPersons();

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <section className="flex py-6 gap-6">
      <PersonsTable persons={persons.getPersons} />
    </section>
  );
};

export default Persons;
