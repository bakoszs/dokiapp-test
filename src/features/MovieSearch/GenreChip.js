import React from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    genreChip: {
        margin: theme.spacing(0.2, 0.5)
    }
  }));

const GenreChip = ({ genre }) => {
    const classes = useStyles();

    if(!genre) return null;

    return (<Chip variant="outlined"
        size="small"
        label={genre.name}
        className={classes.genreChip}
        />);
};

GenreChip.displayName = "GenreChip";

GenreChip.propTypes = {
    genre: PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired
};

export { GenreChip };
export default GenreChip;