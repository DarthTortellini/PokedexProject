import React from "react";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import { Route, Switch } from "react-router-dom";

const App = () => (
  <Switch>
     <Route
      path ="/:pokemonId"
      render={(props) => <Pokemon {...props} />}
    />
    <Route exact path="/" render={(props) => <Pokedex {...props} />} />
   
  </Switch>
);

export default App;