import React from "react";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import { Route, Switch } from "react-router-dom";

const App = () => (
  <Switch>
     <Route
      path ="/:pokemonId">
        <Pokemon />
      
    </Route>
    <Route exact path="/">
        <Pokedex />
    </Route>
   
  </Switch>
);

export default App;