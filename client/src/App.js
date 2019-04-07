import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";


import BookList from './compontents/Booklist'
import AddBook from './compontents/AddBook'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div >
            <h1>GraphQL BookList</h1>
            <BookList/>
            <AddBook/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
