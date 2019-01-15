import React from 'react';
import {AppRegistry} from 'react-native';
import Routes from './src/routes';
import {name as appName} from './app.json';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql'
});

class Root extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent(appName, () => Root);
