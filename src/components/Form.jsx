import {
  Box,
  TextField,
  MenuItem,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const tiposBiblioteca = ["Pública", "Privada"];

export default function Form() {
  const [tipoBiblioteca, setTipoBiblioteca] = useState("Pública");
  const [estadoFormulario, setEstadoFormulario] = useState({
    localidad: "",
    codPostal: "",
    provincia: "",
    tipoBiblioteca: tipoBiblioteca,
  });

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
        <Typography variant="h5" color="#424242">
          Resultados de la búsqueda
        </Typography>
      </Box>
    </Box>
  );
}
