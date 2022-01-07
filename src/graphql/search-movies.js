import { gql } from '@apollo/client';

export const SEARCH_MOVIES = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      id
      name
      score
      releaseDate
      genres {
        id
        name
      }
      poster {
        small
      }
    }
  }
`;
