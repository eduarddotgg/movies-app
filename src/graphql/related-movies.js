import { gql } from '@apollo/client';

export const RELATED_MOVIES = gql`
    query movie($id: ID!) {
        movie(id: $id) {
            id
            name
            releaseDate
            similar {
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
    }
`;
