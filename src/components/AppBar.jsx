import { ArrowBack, Settings } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Appbar() {
  const location = useLocation();

  const buildBackButton = () => {
    if (location.pathname !== "/config") {
      return <div></div>;
    } else {
      return (
        <Box mr={1}>
          <Link to="/">
            <IconButton sx={{ color: "white" }}>
              <ArrowBack />
            </IconButton>
          </Link>
        </Box>
      );
    }
  };

  const buildConfigButton = () => {
    if (location.pathname === "/config") {
      return <div></div>;
    } else {
      return (
        <Link to="/config">
          <IconButton sx={{ color: "white" }}>
            <Settings />
          </IconButton>
        </Link>
      );
    }
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            {buildBackButton()}
            <Typography variant="h6" color="inherit" component="div">
              Buscador de bibliotecas
            </Typography>
          </Box>
          {buildConfigButton()}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
