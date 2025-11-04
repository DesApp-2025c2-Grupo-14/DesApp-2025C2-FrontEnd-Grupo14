import { useState } from "react";
import { Box, Grid,  Stack, Typography, Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";


const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const hours = Array.from({ length: 11 }, (_, i) => 7 + i); // de 7hs a 17hs

// Ejemplo de turnoos
const turnos = [
  { dia: "Lunes", hora: 9, paciente: "Perez, Luis", nroAfiliado: "1" },
  { dia: "Miércoles", hora: 15, paciente: "Gonzales, Maria", nroAfiliado: "10001-01" },
  { dia: "Jueves", hora: 10, paciente: "Velasquez, Edric", nroAfiliado: "3" },
  { dia: "Viernes", hora: 13, paciente: "Gimenez, Lorena", nroAfiliado: "4" },
];

export  function CalendarioGrande() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedturno, setSelectedturno] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [nota, setNota] = useState("");

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
  if (selectedturno && selectedturno.nroAfiliado) {
    navigate(`/historial/${selectedturno.nroAfiliado}`);
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
       sx= {{width :"100vw"}}
       >
        <DialogTitle>Crear Nota</DialogTitle>
        <DialogContent sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2
          }}>
          <TextField
            label="Nota"
            multiline
            minRows={10}
            fullWidth
            onChange={(e) => setNota(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancel(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}