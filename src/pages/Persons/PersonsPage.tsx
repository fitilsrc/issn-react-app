import { Error, Loader } from "@/components";
import { PersonsTable } from "@/components/persons/persons-table";
import { useGetPersons } from "@/lib/hooks";

const PersonsPage = () => {
  const {persons, loading, error} = useGetPersons();

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <section className="flex py-6 gap-6">
      <PersonsTable persons={persons.getPersons} />
    </section>
  );
};

export default PersonsPage;
