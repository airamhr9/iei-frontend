import{
    Card,
    CardContent,  
    Typography, 
    Grid,
    
}from "@mui/material";
  

export default function BiblioData(props) {
//const BiblioData = (props) =>{  
return (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> */}
            <Typography variant="h5" component="div">
              {props.nombre}
            </Typography>            
            <Typography >
              {props.tipo}
            </Typography>
            <Typography variant="body1"  sx={{ mb: 1.5 }}>
             {props.descripcion}             
            </Typography>
            <Typography variant="body2">
            <Typography variant="subtitle1">
                Contacto:                             
                </Typography>
                <Grid container spacing={2}>
            <Grid item xs={3}>
             {props.localidad} ({props.provincia}) CP: {props.cp}
              <br />
              {props.direccion}             
            </Grid>
            <Grid item xs={5}>
          Tlf: {props.telefono}
              <br/>
              Email: {props.email}             
        </Grid>
        </Grid>           
            </Typography>            
          </CardContent>        
        </Card>
      );
}

 ;