import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPHQL_URI } from '../utils/constants';

const client = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache()
});

export default client;
