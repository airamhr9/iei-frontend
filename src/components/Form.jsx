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
  const [estadoFormulario, setEstadoFormulario] = useState({
    localidad: "",
    codPostal: "",
    provincia: "",
    tipoBiblioteca: tipoBiblioteca,
  });


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
            <Button fullWidth variant="contained">
              Buscar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="outlined">
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
        <Grid item xs={0} md={3}/>
        <Grid item xs={12} md={6}>
        
        <Typography variant="h5" color="#424242" sx={{ mb: 1.5 }}>
          Resultados de la búsqueda
        </Typography>
        
              {/* Cambiar llamar a esta biblioteca de prueba por la llamada a Bibliolist */}
              
          <BiblioData 
           nombre="Nombre de la biblioteca"
           tipo = "Publica"
           localidad = "Localidad"
           provincia = "Provincia"
           direccion = "Calle Bla bla Nº143"
           cp = "46020"
           telefono = "123456789"
           email = "correo@mail.com"
           descripcion="Una descripcion muy larga para ir probando a ver que tal funciona" />
        </Grid>
        <Grid item xs={0} md={3}/>
      </Grid>
        

      </Box>
    </Box>
  );
}
