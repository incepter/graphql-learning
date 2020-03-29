import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const getBooksQuery = gql`
  {
    books {
      id
      name
      genre
    }
  }
`;

export default function BookList() {
  const { data, loading, error } = useQuery(getBooksQuery);
  console.log('data', data);
  return (<div>
    {loading && 'Loading ...'}
    <ul>
      {!loading && !error && data.books.map(t => (
        <li key={t.id}>{t.name} - {t.genre}</li>
      ))}
    </ul>
  </div>);
}
