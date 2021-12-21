import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Appbar() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div">
          Buscador de bibliotecas
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
