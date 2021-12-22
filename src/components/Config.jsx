import {
  Box,
  Checkbox,
  Grid,
  FormControlLabel,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function Config() {
  const [selectAll, setSelectAll] = useState(true);

  const [fuentesDeDatos, setFuentesDeDatos] = useState({
    valencia: true,
    euskadi: true,
    catalunya: true,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFuentesDeDatos((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleChangeSelectAll = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setFuentesDeDatos({
        valencia: true,
        euskadi: true,
        catalunya: true,
      });
    } else {
      setFuentesDeDatos({
        valencia: false,
        euskadi: false,
        catalunya: false,
      });
    }
    setSelectAll(checked);
  };

  useEffect(() => {
    console.log(fuentesDeDatos);
  }, [fuentesDeDatos]);

  return (
    <Box component="form" m={5}>
      <Grid container spacing={2}>
        <Grid container item xs={6} spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectAll}
                  onChange={handleChangeSelectAll}
                  name="selectAll"
                />
              }
              label="Seleccionar todos"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fuentesDeDatos.valencia}
                  onChange={handleChange}
                  name="valencia"
                />
              }
              label="Comunitat Valenciana"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fuentesDeDatos.euskadi}
                  onChange={handleChange}
                  name="euskadi"
                />
              }
              label="Euskadi"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fuentesDeDatos.catalunya}
                  onChange={handleChange}
                  name="catalunya"
                />
              }
              label="Catalunya"
            />
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained">
              Cargar
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
