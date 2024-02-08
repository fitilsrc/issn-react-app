import React from 'react';
import { gql, useQuery } from '@apollo/client';

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
  const { data, error, loading } = useQuery(GET_PERSONS);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  console.log('[log] persons', data)

  return (
    <section className="flex py-6 gap-6">
      Test
    </section>
  )
}

export default Persons