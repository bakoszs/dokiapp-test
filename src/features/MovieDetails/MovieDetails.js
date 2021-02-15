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
import { useWiki } from "./useWiki";
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
    //const { name } = useParams();
    const q = useQuery();
    const id = q.get("id");
    const name = q.get("name");
    console.log("query =", id, name, q);

    const [movieTitle, updateMovieTitle] = useState("");

    const { response, error, loading, execute } = useWiki({
        config: {
            params: {
                action: "query",
                exintro: 1,
                explaintext: 1,
                format: "json",
                origin: "*",
                prop: "extracts",
                titles: movieTitle
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
        
    };

    useEffect(() => {
        updateMovieTitle(name);
    }, [name]);

    useEffect(() => {
        if(movieTitle) {
            execute();
        }
    }, [movieTitle]);

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
                <Button variant="contained" onClick={visitImdb} color="primary" disabled>View on IMDB</Button>
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