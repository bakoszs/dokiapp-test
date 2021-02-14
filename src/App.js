import React from "react";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// As per test requirements, this feature exposes a simple
// movie title search functionality
import { MovieSearch } from "./features";

const App = () => {
  return <React.Fragment>
    <CssBaseline />
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>Movie Search</Typography>
      </Toolbar>
    </AppBar>
    <main>
      <MovieSearch />
    </main>
  </React.Fragment>;
};

export { App };
export default App;