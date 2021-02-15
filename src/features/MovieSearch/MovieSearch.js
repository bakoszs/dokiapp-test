import React, { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { SearchHandler } from "./SearchHandler";
import { SearchQuery } from "./SearchQuery";
import { Config } from "../../config";

const useStyles = makeStyles((theme) => ({
    searchHeader: {
        padding: theme.spacing(2, 0, 2)
    }    
}));

const client = new ApolloClient({
    uri: Config.graphQlEndpoint,
    cache: new InMemoryCache()
});

const MovieSearch = () => {
    const classes = useStyles();
    const [query, updateQuery] = useState(null);
    
    const handleQueryChange = (queryText) => {
        updateQuery(queryText);
    };

    return <ApolloProvider client={client}>
        <div className={classes.searchHeader}>
            <Container maxWidth="sm">
                <SearchQuery headerText="Enter a movie title" onQueryChange={handleQueryChange} />
            </Container>
            <Container>
                <SearchHandler query={query} />
            </Container>            
        </div>
  </ApolloProvider>;
};

export { MovieSearch };
export default MovieSearch;