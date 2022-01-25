import { DateRange } from "@mui/icons-material";
import {
  Box,
  TextField,
  MenuItem,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import BiblioData from "./BiblioData";

const tiposBiblioteca = ["Pública", "Privada"];

export default function Form() {
  const [tipoBiblioteca, setTipoBiblioteca] = useState("Pública");
  const [hasSearched, setHasSearched] = useState(false);
  const [estadoFormulario, setEstadoFormulario] = useState({
    localidad: "",
    codPostal: "",
    provincia: "",
    tipoBiblioteca: tipoBiblioteca,
  });

  const [searchResultCards, setSearchResultsCards] = useState([]);

  const loadSources = () => {
    fetch("http://localhost:8080/load?sources=eus&cat&cv", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getSearchResults = () => {
    let searchParams = "";
    if (estadoFormulario.tipoBiblioteca === "Pública") {
      searchParams += "?tipo=Publica";
    } else {
      searchParams += "?tipo=Privada";
    }
    if (estadoFormulario.localidad !== "") {
      searchParams += `&localidad=${estadoFormulario.localidad}`;
    }
    if (estadoFormulario.codPostal !== "") {
      searchParams += `&codigoPostal=${estadoFormulario.codPostal}`;
    }
    if (estadoFormulario.provincia !== "") {
      searchParams += `&provincia=${estadoFormulario.provincia}`;
    }

    console.log("http://localhost:8080/search" + searchParams);

    fetch("http://localhost:8080/search" + searchParams, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        buildSearchResults(data);
      });
  };

  const buildSearchResults = (data) => {
    console.log(data);
    let resultCards = [];
    for (let i = 0; i < data.length; i++) {
      resultCards.push(
        <Grid item container xs={12} key={i}>
          <Grid item xs={0} md={3}>
            <div />
          </Grid>
          <Grid item xs={12} md={6}>
            <div />
            <BiblioData
              nombre={data[i].nombre}
              tipo={data[i].tipo}
              localidad={data[i].enLocalidad.nombre}
              provincia={data[i].enLocalidad.enProvincia.nombre}
              direccion={data[i].direccion}
              cp={data[i].codigoPostal}
              telefono={data[i].telefono}
              email={data[i].email}
              descripcion={data[i].descripcion}
            />
          </Grid>
          <Grid item xs={0} md={3}>
            <div />
          </Grid>
        </Grid>
      );
    }

    setHasSearched(true);
    setSearchResultsCards(resultCards);
  };

  //Construye las tarjetas de biblioteca
  /*  const biblioList = res.map(biblio =>{

    return <biblioList
       nombre={biblio.nombre}
           tipo = {biblio.tipo}
           localidad = {biblio.localidad}
           provincia = {biblio.provincia}
           direccion = {biblio.direccion}
           cp = {biblio.codPostal}
           telefono = {biblio.telefono}
           email = {biblio.email}
           descripcion={biblio.descripcion} />    
  }) */

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEstadoFormulario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeTipo = (event) => {
    setTipoBiblioteca(event.target.textContent);
    handleFormChange(event);
  };

  useEffect(() => {
    console.log(estadoFormulario);
  }, [estadoFormulario]);

  return (
    <Box component="form" m={5}>
      <Grid container spacing={2}>
        <Grid container item xs={6} spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="localidad"
              label="Localidad"
              onChange={handleFormChange}
              value={estadoFormulario.localidad}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="codPostal"
              label="Código Postal"
              onChange={handleFormChange}
              value={estadoFormulario.codPostal}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="provincia"
              label="Provincia"
              onChange={handleFormChange}
              value={estadoFormulario.provincia}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="tipoBiblioteca"
              select
              label="Tipo"
              value={estadoFormulario.tipoBiblioteca}
              onChange={handleChangeTipo}
              helperText="Selecciona el tipo de biblioteca"
            >
              {tiposBiblioteca.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={getSearchResults}>
              Buscar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" onClick={loadSources}>
              Cancelar
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Box height="350px" bgcolor="black">
            <Typography color="white">map</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box mt={5}>
        <Grid container spacing={1}>
          {hasSearched ? (
            searchResultCards.length > 0 ? (
              searchResultCards
            ) : (
              <Typography>No se han encontrado resultados</Typography>
            )
          ) : (
            <div></div>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
