import React from "react";
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { GenreChip } from "./GenreChip";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(1)
    },
    poster: {
        height: 140
    },
    score: {
        marginTop: theme.spacing(1)
    }
}));

const getFallbackPosterThumbnail = (name) => `https://via.placeholder.com/140.png?text=${encodeURIComponent(name)}`;

const MovieCard = ({ movie }) => {
    const classes = useStyles();

    if (!movie) return null;

    return (<Grid item key={movie.id} component={Card} md={2} className={classes.card}>
        <CardMedia title={movie.name} image={(movie.poster && movie.poster.thumbnail) || getFallbackPosterThumbnail(movie.name)} className={classes.poster} />
        <CardContent>
            <Typography variant="h5" gutterBottom>
                <Link component={RouterLink} to={`/${movie.name}`}>
                    {movie.name}
                </Link>
            </Typography>
            <Typography color="textSecondary" gutterBottom>
                {new Date(movie.releaseDate).getFullYear()}
                {movie.genres.map(genre => <GenreChip genre={genre} key={genre.id} />)}
            </Typography>
            <Typography variant="body2" component="p">
                {movie.overview}
            </Typography>
            <Typography color="textSecondary" variant="body2" component="p" className={classes.score}>
                Rated {movie.score}/10 ({movie.votes} votes)
            </Typography>
        </CardContent>
    </Grid>);
};

MovieCard.displayName = "MovieCard";

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        overview: PropTypes.string,
        releaseDate: PropTypes.string,
        score: PropTypes.number
    }).isRequired
};

export { MovieCard };
export default MovieCard;