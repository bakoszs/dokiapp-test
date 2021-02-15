import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, AlertTitle } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { tmdbApi, useApi, wikiApi } from "./useApi";
import { useQuery } from "../../useQuery";
import { Config } from "../../config";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(2),
        whiteSpace: "pre-line"
    },
    spinner: {
        margin: theme.spacing(4)
    }
}));

const MovieDetails = () => {
    
    const classes = useStyles();
    
    const qs = useQuery();
    const id = qs.get("id");
    const name = qs.get("name");

    const [movieTitle, updateMovieTitle] = useState();
    const [movieId, updateMovieId] = useState();

    const { response, error, loading, execute } = useApi({
        api: wikiApi,
        config: {
            params: {
                action: "query",
                exintro: 1,
                explaintext: 1,
                format: "json",
                origin: "*",
                prop: "extracts",
                redirects: true,
                titles: movieTitle
            }
        },
        options: {
            manual: true
        }
    });

    const { response: tmdbResponse, error: tmdbError, loading: tmdbLoading, execute: tmdbExecute } = useApi({
        api: tmdbApi,
        config: {
            url: `${Config.tmdbApiUrl}/movie/${movieId}`,
            params: {
                api_key: Config.tmdbApiKey
            }
        },
        options: {
            manual: true
        }
    });

    const visitWikipedia = () => {
        const url = Config.getWikiPageUrl(movieTitle);
        window.open(url, "_blank");
    };

    const visitImdb = () => {
        const imdbId = tmdbResponse.imdb_id;
        const url = Config.getImdbTitleUrl(imdbId);
        window.open(url, "blank");
    };

    useEffect(() => updateMovieTitle(name), [name]);
    useEffect(() => updateMovieId(id), [id]);

    useEffect(() => {
        if(movieTitle) {
            execute();
        }
    }, [movieTitle]);

    useEffect(() => {
        if(movieId) {
            tmdbExecute();
        }
    }, [movieId]);

    if(loading) {
        return <Box display="flex" justifyContent="center" className={classes.spinner}>
            <CircularProgress />
        </Box>;
    }

    if(error) {
        return <Alert variant="filled" severity="error">
            <AlertTitle>Something went wrong</AlertTitle>
            {error}
        </Alert>;
    }

    // For the sake of simplicity, I only care about a single result
    if(!response) return null;

    const { query } = response;
    if(!query) return null;

    const { pages } = query;
    if(!pages) return null;

    const ids = Object.keys(pages);
    const firstPage = pages[ids[0]];
    
    return <Container className={classes.container} maxWidth="md">
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Typography variant="h2">{firstPage.title}</Typography>
            </Grid>
            <Grid item xs>
                <Button variant="contained" onClick={visitWikipedia} color="primary">View on Wikipedia</Button>
            </Grid>
            <Grid item xs>
                <Button variant="contained" onClick={visitImdb} color="primary" disabled={tmdbLoading || tmdbError}>View on IMDB</Button>
            </Grid>
        </Grid>
        
        <Paper elevation={3} className={classes.paper}>
            <Typography variant="body2" component="p">{firstPage.extract || "Wikipedia had no information about this movie"}</Typography>
        </Paper>
    </Container>;
};

MovieDetails.displayName = "MovieDetails";

export { MovieDetails };
export default MovieDetails;