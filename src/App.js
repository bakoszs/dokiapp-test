import React from "react";
import { Switch, Route } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// As per test requirements, this feature exposes a simple
// movie title search functionality
import { MovieDetails, MovieSearch } from "./features";

const App = () => {
  return <React.Fragment>
    <CssBaseline />
    <AppBar position="relative">
      <Toolbar>
        <Link href="/" color="inherit">
          <Typography variant="h6" noWrap>
            Movie Search
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
    <main>
      <Switch>
        <Route path="/movies">
          <MovieDetails />
        </Route>
        <Route path="/">
          <MovieSearch />
        </Route>
      </Switch>
    </main>
  </React.Fragment>;
};

export { App };
export default App;