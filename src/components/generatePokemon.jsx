import { Typography, Link, } from "@material-ui/core";
import { toFirstCharUppercase } from "../constants";
import { fade, makeStyles } from "@material-ui/core/styles";




const generatePokemonJSX = (pokemon) => {
  
  const { name, id, species, height, weight, types, } = pokemon;
  const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
  const { front_default } = fullImageUrl
  return (
    <>
  <div style= {{display:"flex", flexDirection: "column",justifyContent:"center", textAlign:"center", borderWidth:"5px",}}>
      <Typography variant="h1">
        {`${id}.`} {toFirstCharUppercase(name)}
        <img src={front_default} />
        <hr/>
      </Typography>
      <img style={{ width: "300px", height: "300px", alignSelf:"center" }} src={fullImageUrl} />
      <hr/>
      <Typography variant="h3">Pokemon Info</Typography>
      <hr/>
      <Typography>
        {"Species: "}
        <Link href={species.url}>{species.name} </Link>
      </Typography>
      <Typography>Height: {height} </Typography>
      <Typography>Weight: {weight} </Typography>

      <Typography variant="h6"> Types:</Typography>
      {types.map((typeInfo) => {
        const { type } = typeInfo;
        const { name } = type;
        return <Typography key={name}> {`${name}`}</Typography>;
      })}
      </div>
    </>
  );
};

export default generatePokemonJSX