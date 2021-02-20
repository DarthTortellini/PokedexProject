import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CircularProgress,
    Toolbar,
    AppBar,
    TextField,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "./constants";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
    },
    cardMedia: {
        margin: "auto",
    },
    cardContent: {
        textAlign: "center",
    },
    searchContainer: {
        display: "flex",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px",
    },
    searchInput: {
        width: "200px",
        margin: "5px",
    },
}));

const Pokedex = (props) => {
    const classes = useStyles();
    const { history } = props;
    const [pokemonData, setPokemonData] = useState([]);
    const [filterList, setFilterList] = useState([]);


    useEffect(() => {
        fetch(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
            .then((response) => response.json())
            .then((result) => {
                setPokemonData(result.pokemon);
                setFilterList(result.pokemon);

            })

    }, [])


    const handleSearchChange = (e) => {
        const name = document.getElementById("pokeName").value.toLowerCase();
        const type = document.getElementById("pokeType").value.toLowerCase().split(" ");
        const weaknesses = document.getElementById("pokeWeaknesses").value.toLowerCase().split(" ");


        let tempArray = Array.from(pokemonData)

        if (type) {
            tempArray = pokemonData.filter((pokemon) => {
                let include = false
                pokemon.type.forEach((poke_type) => {
                    let count = 0;
                    do {

                        if (poke_type.toLowerCase().includes(type[count])) {

                            include = true
                        }
                        count++
                    } while (count < type.length);

                });
                return include
            })
            console.log(tempArray)
        }

        if (name) {
            tempArray = tempArray.filter((pokemon) => {
                if (pokemon.name.toLowerCase().includes(name)) {

                    return true
                } else {
                    return false
                }

            })
        }

        if (weaknesses) {
            tempArray = tempArray.filter((pokemon) => {
                let include = false
                pokemon.weaknesses.forEach((poke_weaknesses) => {
                    let count = 0;
                    do {

                        if (poke_weaknesses.toLowerCase().includes(weaknesses[count])) {

                            include = true
                        }
                        count++
                    } while (count < weaknesses.length);
                });
                return include
            })
        }
        console.log(tempArray)
        setFilterList(tempArray)
    }





    const getPokemonCard = (pokemonId) => {
        const { id, name, img, weight, height, weaknesses, type } = pokemonId;
        return (
            <Grid item xs={4} key={pokemonId}>
                <Card onClick={() => history.push(`/${id}`)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={img}
                        style={{ width: "130px", height: "130px" }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography>
                            <h3>
                                {`${id}. ${toFirstCharUppercase(name)}`}
                            </h3>
                        </Typography>
                        <hr />
                        <Typography>{` Weight: ${weight}`}</Typography>
                        <Typography>{` Height: ${height}`}</Typography>
                        <Typography> {`Type: ${type.join(", ")}`}</Typography>
                        <Typography> {`Weaknesses: ${weaknesses.join(", ")}`}</Typography>

                    </CardContent>
                </Card>
            </Grid>
        );
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon} />
                        <TextField
                            className={classes.searchInput}
                            onChange={handleSearchChange}
                            label="Pokemon"
                            variant="standard"
                            id="pokeName"
                        />
                    </div>
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon} />
                        <TextField
                            className={classes.searchInput}
                            onChange={handleSearchChange}
                            label="Type"
                            variant="standard"
                            id="pokeType"
                        />
                    </div>
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon} />
                        <TextField
                            className={classes.searchInput}
                            onChange={handleSearchChange}
                            label="Weaknesses"
                            variant="standard"
                            id="pokeWeaknesses"
                        />
                    </div>

                </Toolbar>

            </AppBar>

            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {filterList.map(
                        (pokemonId) =>

                            getPokemonCard(pokemonId)
                    )}

                </Grid>
            ) : (
                    <CircularProgress />
                )}
        </>
    );
};

export default Pokedex;





