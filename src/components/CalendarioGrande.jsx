/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Grid,  Stack, Typography, Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import FormularioCrearHistoria from "./FormularioCrearHistoria";


const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const hours = Array.from({ length: 11 }, (_, i) => 7 + i); // de 7hs a 17hs

// Ejemplo de turnoos
const turnos = [
  { dia: "Lunes", hora: 9, paciente: "Perez, Luis", _id: "1" },
  { dia: "Miércoles", hora: 15, paciente: "Gonzales, Maria", _id: "690abe31012b0e1dda9d6b27" },
  { dia: "Jueves", hora: 10, paciente: "Velasquez, Edric", _id: "3" },
  { dia: "Viernes", hora: 13, paciente: "Gimenez, Lorena", _id: "4" },
];

export  function CalendarioGrande(props) {
  /*TERMINAR
  const turnosAll = props.turnos
  */
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedturno, setSelectedturno] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const handleMenuOpen = (turno, data) => {
    setAnchorEl(turno.currentTarget);
    setSelectedturno(data);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedturno(null);
  };


  const handleHistorial = () => {
  if (selectedturno && selectedturno._id) {
    navigate(`/historial/${selectedturno._id}`);
  } else {
    alert("No se encontró el ID del paciente en el turno seleccionado");
  }
  handleMenuClose();
};

  // Al presionar "Crear"
  const handleCrear = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  // Al presionar "Guardar" en el formulario
  const handleSave = () => {
    setOpenDialog(false);
    setSelectedturno(null);
  };
  //Al presionar "Cancelar" en el formulario
  const handleCancel = () => {
    setOpenDialog(false);
     handleMenuClose();
  };

  const agregarNota= async (nuevaHistoria)=>{
    if (!selectedturno) {
    console.error("No hay turno seleccionado");
    return;
  }
    try{
      const datos ={
        ...nuevaHistoria,fecha:selectedturno.fechaHora
      }
      // post de situaciones usando id para crear
      await axios.post(`http://localhost:3000/pacientes/${selectedturno.pacienteId._id}/crearHistoria`, datos)
    }catch(error){
    console.error("Error al crear la nueva situacion:", error);
    }
  }
    
    return (
      <Box sx={{ p: 2, overflowX: "auto" }}>
      <Grid container>
        <Grid item xs={1}></Grid>
        {days.map((dia) => (
          <Grid item xs key={dia} sx={{ textAlign: "center", fontWeight: "bold" }}>
            {dia}
          </Grid>
        ))}
      </Grid>

      {/* Filas por hora */}
      {hours.map((hora) => (
        <Grid container key={hora} sx={{ borderTop: "2px solid #ddd" }}>
          {/* Columna horarios */}
          <Grid
            item
            xs={1}
            sx={{ borderRight: "1px solid #ddd", p: 2, textAlign: "right"}}
          >
            <Typography variant="body2">{`${hora}:00`}</Typography>
          </Grid>

          {/* Celdas días,si se encuentra un turno en el dia,se crea la ficha del turno*/}
          {days.map((dia) => {
            const turno = turnos.find((e) => e.dia === dia && e.hora === hora);
            return (
              <Grid
                item
                xs
                key={dia + hora}
                sx={{
                  borderRight: "1px solid #eee",
                  height: 60,
                  position: "relative",
                  bgcolor:  "white",
                }}
              >
                {turno && (
                  <Stack direction="row"
                    sx={{
                      width:"100%",
                      height:"100%",
                      bgcolor: "#90caf9",
                     justifyContent:"space-between"
                    }}
                  >
                    <Stack direction="column" sx={{marginLeft:"10px"}}>
                      <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                        {`${turno.hora}:00`}
                      </Typography>                    
                      <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                        {turno.paciente}
                      </Typography>
                    </Stack>
                    <Button sx={{minWidth: "20px", width: "30px", height: "30px"}} onClick={(e) => handleMenuOpen(e, turno)}>
                      <MoreVertIcon/>
                    </Button>
                  </Stack>
                )}
              </Grid>
            );
          })}
        </Grid>
      ))}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem onClick={handleCrear}>Crear Nota</MenuItem>
        <MenuItem onClick={handleHistorial}>Ver Historial</MenuItem>
      </Menu>

      {/* Crear nota*/}
      <Dialog
       open={openDialog}
       onClose={() => setOpenDialog(false)}
       fullWidth
       sx= {{width :"100vw", backgroundColor:"transparent"}}
       >
        <FormularioCrearHistoria onGuardar = {agregarNota}/>
      </Dialog>
    </Box>
  );
}