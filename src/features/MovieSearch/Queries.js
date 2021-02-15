import { gql } from "@apollo/client";

export const FIND_MOVIES = gql`
    query SearchMovies($query: String!) {
        searchMovies(query: $query) {
            id
            genres {
                id
                name
            }
            name
            overview
            poster {
                thumbnail
            }
            releaseDate
            score
            votes
        }
    }
`;