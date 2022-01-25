import {
  Box,
  Checkbox,
  Grid,
  FormControlLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  CircularProgress,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function Config() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sourcesLoaded, setSourcesLoaded] = useState(false);

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick" && !sourcesLoaded) {
      return;
    }
    setDialogOpen(false);
  };

  const [fuentesDeDatos, setFuentesDeDatos] = useState({
    valencia: false,
    euskadi: false,
    catalunya: false,
  });

  useEffect(() => {
    fetch("http://localhost:8080/load", {
      method: "GET",
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setFuentesDeDatos({
          valencia: data.includes("ComunitatValenciana"),
          euskadi: data.includes("Euskadi"),
          catalunya: data.includes("Catalunya"),
        });
      });
  }, []);

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
  };

  const loadSelected = () => {
    setSourcesLoaded(false);
    setDialogOpen(true);
    let fuentes = "";
    if (fuentesDeDatos.valencia) {
      fuentes += "cv-";
    }
    if (fuentesDeDatos.catalunya) {
      fuentes += "cat-";
    }
    if (fuentesDeDatos.euskadi) {
      fuentes += "eus-";
    }
    fuentes = fuentes.substring(0, fuentes.length - 1);
    console.log(fuentes);
    fetch("http://localhost:8080/load?sources=" + fuentes, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setSourcesLoaded(true);
    });
  };

  return (
    <Box component="form" m={5}>
      <Grid container item xs={4} spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  fuentesDeDatos.valencia &&
                  fuentesDeDatos.catalunya &&
                  fuentesDeDatos.euskadi
                }
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
          <Button fullWidth variant="contained" onClick={loadSelected}>
            Cargar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="outlined">
            Cancelar
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Cargando fuentes de datos"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            {!sourcesLoaded ? (
              <CircularProgress />
            ) : (
              <DialogContentText>Se ha completado la carga</DialogContentText>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={!sourcesLoaded}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
