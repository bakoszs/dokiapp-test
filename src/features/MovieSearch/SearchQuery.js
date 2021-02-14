import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({    
    searchBox: {
        margin: theme.spacing(1),
        padding: theme.spacing(2, 0, 2)
    },
    searchButton: {
        margin: theme.spacing(1, 0)
    }
}));

const SearchQuery = ({ headerText, onQueryChange }) => {
    const classes = useStyles();
    const [query, updateQuery] = useState("");

    const invokeCallback = () => {
        // If there's a callback provided and the query is non-null, invoke it
        if(onQueryChange instanceof Function) {
            if(query) {
                onQueryChange(query);
            }
        }
    };

    const handleClick = () => {        
        invokeCallback();
    };

    const handleChange = (evt) => {
        updateQuery(_ => evt.target.value);
    };

    const handleKeyPress = (evt) => {
        if(evt.key.toUpperCase() === "ENTER") {
            evt.preventDefault();
            invokeCallback();
        }
    };

    return (<React.Fragment>
        <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
            Search for a movie title
        </Typography>
        <div className={classes.searchBox}>
            <TextField                
                id="title-query"
                label={headerText}
                fullWidth
                value={query}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                InputProps={{
                endAdornment: (
                    <InputAdornment position="start"><SearchIcon /></InputAdornment>
                ),
                }}
            />
            <Button
                variant="contained"
                color="primary"
                className={classes.searchButton}
                startIcon={<SearchIcon />}
                fullWidth
                onClick={handleClick}
                disabled={!query}
            >
                Search
            </Button>
        </div>
    </React.Fragment>);
};

SearchQuery.propTypes = {
    headerText: PropTypes.string,
    onQueryChange: PropTypes.func
};

export { SearchQuery };
export default SearchQuery;