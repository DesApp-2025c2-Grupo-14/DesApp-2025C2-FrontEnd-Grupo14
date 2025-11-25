/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid,  Stack, Typography, Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import FormularioCrearHistoria from "./FormularioCrearHistoria";
import  dayjs  from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");


const days = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const hours = Array.from({ length: 11 }, (_, i) => 7 + i); // de 7hs a 17hs

export  function CalendarioGrande(props) {
  const [turnosHoy,setTurnosHoy] = useState([])
  
  useEffect(() => {
  const fechaBase = dayjs(props.fechaSeleccionada);
  
  const diaDeSemana = fechaBase.day();
  const inicioSemana =
    diaDeSemana === 0
      ? fechaBase.subtract(6, "day").startOf("day") // si es domingo, ir al lunes anterior
      : fechaBase.startOf("day").subtract(diaDeSemana - 1, "day"); // retrocede hasta lunes
  
  const finSemana = inicioSemana.add(5, "day").endOf("day"); // sábado al final del día

  const turnosFiltrados = props.turnos.filter((t) => {
    const fechaTurno = dayjs(t.fechaHora);
    return fechaTurno.isAfter(inicioSemana) && fechaTurno.isBefore(finSemana);
  });

  setTurnosHoy(turnosFiltrados);
}, [props.fechaSeleccionada, props.turnos]);
 
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedturno, setSelectedturno] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const handleMenuOpen = (turno, data) => {
    setAnchorEl(turno.currentTarget);
    setSelectedturno(data);
    console.log(data)
  };

  const handleHistorial = () => {
  if (selectedturno && selectedturno._id) {
    navigate(`/historial/${selectedturno.pacienteId._id}`);
  } else {
    alert("No se encontró el ID del paciente en el turno seleccionado");
  }
  setAnchorEl(null);
};

  // Al presionar "Crear"
  const handleCrear = (data) => {
    setOpenDialog(true);
    setSelectedturno(data);
    setAnchorEl(null);
  };

  // Al presionar "Guardar" en el formulario
  const handleSave = () => {
    setOpenDialog(false);
    setSelectedturno(null);
  };
  //Al presionar "Cancelar" en el formulario
  const handleCancel = () => {
    setOpenDialog(false);
    setAnchorEl(null);
  };

  const agregarNota= async (nuevaHistoria)=>{
    if (!selectedturno) {
    console.error("No hay turno seleccionado");
    return;
  }
    try{
      const datos ={
        ...nuevaHistoria,
        fecha:selectedturno.fechaHora
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
            const turno = turnosHoy.find((e) => dayjs(e.fechaHora).format("dddd") === dia && dayjs(e.fechaHora).hour() === hora);
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
                        {`${dayjs(turno.fechaHora).hour()}:00`}
                      </Typography>                    
                      <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                        {`${turno.pacienteId.nombre} ${turno.pacienteId.apellido}`}
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
        onClose={()=>setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem onClick={() => handleCrear(selectedturno)}>Crear Nota</MenuItem>
        <MenuItem onClick={handleHistorial}>Ver Historial</MenuItem>
      </Menu>

      {/* Crear nota*/}
      <Dialog
       open={openDialog}
       onClose={() => setOpenDialog(false)}
       fullWidth
       sx= {{width :"100vw", backgroundColor:"transparent"}}
       >
        <FormularioCrearHistoria onGuardar = {agregarNota} cerrar = {handleSave} prestador={props.prestador} />
      </Dialog>
    </Box>
  );
}