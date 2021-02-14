import { gql } from "@apollo/client";

export const FIND_MOVIES = gql`
    query SearchMovies($query: String!) {
        searchMovies(query: $query) {
        id
        name
        overview
        releaseDate
        cast {
            id
            person {
            name
            }
            role {
            ... on Cast {
                character
            }
            }
        }
        }
    }
`;