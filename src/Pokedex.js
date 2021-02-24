import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom"
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
    BottomNavigation,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "./constants";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { Gradient } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

const useStyles = makeStyles((theme) => ({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
        backgroundImage: "url(https://wallpapercave.com/wp/foVCgr1.jpg)",
    },
    cardMedia: {
        margin: "auto",
        backgroundImage: "url(https://wallpapercave.com/wp/foVCgr1.jpg)",

    },
    cardContent: {
        textAlign: "center",
        

    },
    searchContainer: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "10px",
        marginBottom: "0px",
        

    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px",
    },
    searchInput: {
        width: "200px",
        margin: "5px",
    },
    Toolbar: {
        display: "flex",
        justifyContent: "space-evenly",
        borderBottom: "10px, black",


    },

}));

const Pokedex = (props) => {
    const classes = useStyles();
    const  history  = useHistory();
    const [pokemonData, setPokemonData] = useState([]);
    const [filterList, setFilterList] = useState([]);


    useEffect(() => {
        console.log("bepis")
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
            <Grid item xs={4} key={id}>
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
                <div className={classes.Toolbar}>
                    <img src="https://purepng.com/public/uploads/medium/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278258617dhmi.png" height="75px" width="75px" ></img>
                    <img src="https://purepng.com/public/uploads/medium/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278258617dhmi.png" height="75px" width="75px"></img>
                    <img src="https://purepng.com/public/uploads/medium/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278258617dhmi.png" height="75px" width="75px"></img>
                    <img src="https://th.bing.com/th/id/R92376cd31daa2b778d0c8c972f4ff15e?rik=UGxgQCA6trucPw&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f2%2fPikachu-Transparent-Background.png&ehk=IkODZDFKK69kkQUJ%2bHeTffq3HSV9Tw5xMlQ2skmbaek%3d&risl=&pid=ImgRaw" height="75px" width="75px"></img>
                   
                    <Toolbar className={classes.Toolbar}>
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
                    <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/f484215b-4e9a-42b5-9feb-77c3dec3a385/dala92b-9ecf2fc6-d8aa-4c90-b728-ef6509eebd90.png" height="75px" width="75px"></img>
                    <img src="https://purepng.com/public/uploads/medium/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278258617dhmi.png" height="75px" width="75px"></img>
                    <img src="https://purepng.com/public/uploads/medium/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278258617dhmi.png" height="75px" width="75px"></img>
                    <img src="https://purepng.com/public/uploads/medium/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278258617dhmi.png" height="75px" width="75px"></img>

                </div>
<hr/>
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





