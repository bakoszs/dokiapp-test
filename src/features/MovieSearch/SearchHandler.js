import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Alert, AlertTitle } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import * as Queries from "./Queries";
import { Typography } from "@material-ui/core";

const SearchHandler = ({ query }) => {
    const [movieTitle, updateMovieTitle] = useState(null);
    const [findMovies, { called, loading, error, data }] = useLazyQuery(Queries.FIND_MOVIES);

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

    const cards = (data && data.searchMovies) ? data.searchMovies.map(movie => (<Grid item xs={12} sm={6} md={4} key={movie.id}>
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {new Date(movie.releaseDate).getFullYear()}
                </Typography>
                <Typography variant="h5">{movie.name}</Typography>
            </CardContent>
        </Card>
    </Grid>)) : null;

    return <Grid container spacing={3}>
        { error && `ERROR ${error}`}
        { !loading && !error && data && cards }
    </Grid>;
};

export { SearchHandler };
export default { SearchHandler };