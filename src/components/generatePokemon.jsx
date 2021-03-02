import { Typography, Link, } from "@material-ui/core";
import { toFirstCharUppercase } from "../constants";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Grid,
} from "@material-ui/core";






const generatePokemonJSX = (pokemon) => {

  const { name, id, species, height, weight, types, } = pokemon;
  const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
  const { front_default } = fullImageUrl
  return (
    < >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", borderWidth: "5px", }} boxShadow={5}>
        <Grid style={{ paddingLeft: "200px", paddingRight: "200px", paddingTop: "60px" }} >
          <Card style={{ paddingLeft: "200px", paddingRight: "200px", backgroundImage: "https://www.pngarts.com/files/4/Pokeball-PNG-Image-Transparent-Background.png" }} >
            <CardContent style={{ margin: "auto", display: "flex", flexDirection: "column", backgroundImage: "https://www.pngarts.com/files/4/Pokeball-PNG-Image-Transparent-Background.png" }} >
              <Typography variant="h1">
                {`${id}.`} {toFirstCharUppercase(name)}
                <img src={front_default} />
                <hr />
              </Typography>
              <img style={{ width: "300px", height: "300px", alignSelf: "center" }} src={fullImageUrl} />
              <hr />
              <Typography variant="h3">Pokemon Info</Typography>
              <hr />
              <Typography>
                <strong>{"Species: "}</strong>
                <Link href={species.url}>{toFirstCharUppercase(species.name)} </Link>
              </Typography>
              <Typography><strong>Height:</strong> {height / 10} m</Typography>
              <Typography><strong>Weight:</strong> {weight} lb</Typography>

              <Typography variant="h6"> <strong>Types:</strong></Typography>
              {types.map((typeInfo) => {
                const { type } = typeInfo;
                const { name } = type;
                return <Typography key={name}> {`${toFirstCharUppercase(name)}`}</Typography>;
              })}
            </CardContent>
          </Card>
        </Grid>
      </div>
    </>
  );
};

export default generatePokemonJSX