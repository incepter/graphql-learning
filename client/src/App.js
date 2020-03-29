import React from 'react';
import BookList from "./BookList";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:4000/gql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Hello, world!</h1>
        <BookList/>
      </div>
    </ApolloProvider>
  );
}

export default App;
