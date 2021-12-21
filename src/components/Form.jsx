import { Box, TextField, MenuItem, Grid } from "@mui/material";
import { useState } from "react";

const tiposBiblioteca = ["Pública", "Privada"];

export default function Form() {
  const [tipoBiblioteca, setTipoBiblioteca] = useState("Pública");

  const handleChangeTipo = (event) => {
    setTipoBiblioteca(event.target.value);
  };

  return (
    <Box component="form" ml={5} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            id="localidad"
            label="Localidad"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="codPostal"
            label="Código Postal"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="provincia"
            label="Provincia"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="tipoBiblioteca"
            select
            label="Tipo"
            value={tipoBiblioteca}
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
      </Grid>
    </Box>
  );
}
