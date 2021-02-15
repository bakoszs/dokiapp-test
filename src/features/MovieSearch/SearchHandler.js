import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Alert, AlertTitle } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import * as Queries from "./Queries";
import { MovieCard } from "./MovieCard";

const SearchHandler = ({ query }) => {

    const [movieTitle, updateMovieTitle] = useState(null);
    const [findMovies, { loading, error, data }] = useLazyQuery(Queries.FIND_MOVIES);

    useEffect(() => {
        if(movieTitle) {
            findMovies({
                variables: { query: movieTitle }
            });
        }
    }, [movieTitle]);

    useEffect(() => {
        updateMovieTitle(query);
    }, [query]);

    if(loading) {
        return <Box display="flex" justifyContent="center">
            <CircularProgress />
        </Box>;
    }

    if(error) {
        return <Alert variant="filled" severity="error">
            <AlertTitle>Something went wrong</AlertTitle>
            {error}
        </Alert>;
    }

    const cards = (data && data.searchMovies) ? data.searchMovies.map(movie => <MovieCard movie={movie} key={movie.id} />) : null;

    return <Grid container>        
        { cards }
    </Grid>;
};

export { SearchHandler };
export default { SearchHandler };