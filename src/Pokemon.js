import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import {useParams, useHistory} from "react-router-dom"
import axios from "axios";
import generatePokemonJSX from "./components/GeneratePokemon"

const Pokemon = (props) => {
const history= useHistory()

  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        
        setPokemon(data);
      })
      .catch(function (error) {
        
        setPokemon(false);
      });
  }, [pokemon]);
  console.log("pokemon renders")
  console.log(pokemon)

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}

      {pokemon !== undefined && (
       <div style={{ display: "flex", flexDirection:"column", alignSelf: "center", paddingTop:"35px"}}>
       <Button variant="contained" onClick={() => history.push("/")} style={{ display: "flex", flexDirection:"column", alignSelf: "center"}}>
          Back to Pokedex
        </Button>
        </div>
      )}
    </>
  );
};

export default Pokemon;