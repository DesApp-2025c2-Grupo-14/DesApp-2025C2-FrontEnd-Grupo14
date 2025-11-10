import { useContext } from "react";
import { DatosContext } from "../context/datos";
import { Box, Typography, Stack, Button, Grid, TextField } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export function InfoPaciente({ onAbrirHistoria, onAbrirSituacion }) {
  const { datoSeleccionado } = useContext(DatosContext);


  return (
    <Stack sx={{height: "100%", width:'100%' }}>
      {!datoSeleccionado ? (
        <Box sx={{ alignContent: "center", height: "100%" }}>
          <Stack sx={{ alignItems: "center" }}>
            <Box fontSize={100}>
              <AccountCircleIcon fontSize="inherit" />
            </Box>
            <Typography>Pacientes</Typography>
            <Typography>
              Seleccione un cliente para ver más información
            </Typography>
          </Stack>
        </Box>
      ) : (
        <Stack
          justifyContent={"space-evenly"}
          height="100%"
          bgcolor="#F2F2F2"
          borderRadius={3}
          p={2}
          m={3}
          
        >
            <Stack direction="column" alignItems="center" width='100%'>
              <Stack px={3} width= '65%' textAlign="center">
                <TextField
                  label="Nombre completo"
                  fullWidth
                  value={datoSeleccionado.nombre +' '+ datoSeleccionado.apellido || ""}
                  InputProps={{ readOnly: true }}
                />
              </Stack>
            </Stack>

          <Stack direction="row" justifyContent="space-evenly">
            <Stack px={3} textAlign="center">
              <TextField
                label="Parentesco"
                fullWidth
                value={datoSeleccionado.parentesco || ""}
                InputProps={{ readOnly: true }}
              />
            </Stack>

            <Stack px={3}  textAlign="center">
              <TextField
                label="Fecha Nacimiento"
                fullWidth
                value={datoSeleccionado.fechaNacimiento || ""}
                InputProps={{ readOnly: true }}
              />
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="space-evenly">
            <Stack px={3}  textAlign="center">
              <TextField
                label="Documento"
                fullWidth
                value={datoSeleccionado.dni || ""}
                InputProps={{ readOnly: true }}
              />
            </Stack>

            <Stack px={3}  textAlign="center">
              <TextField
                label="Afiliado"
                fullWidth
                value={datoSeleccionado.nroAfiliado || ""}
                InputProps={{ readOnly: true }}
              />
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="space-evenly">
            <Stack px={3} textAlign="center">
              <TextField
                label="Plan medico"
                fullWidth
                value={datoSeleccionado.planMedico || ""}
                InputProps={{ readOnly: true }}
              />
            </Stack>
              
            <Stack px={3}  textAlign="center">
              <TextField
                label="Teléfono"
                fullWidth
                value={datoSeleccionado.telefono || ""}
                InputProps={{ readOnly: true }}
              />
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="space-evenly" mt={2}>
            <Button
              variant="contained"
              sx={{ borderRadius: 3, px: 3 }}
              onClick={onAbrirHistoria}
            >
              <Typography>Historial clínico</Typography>
            </Button>

            <Button variant="contained"
              sx={{ borderRadius: 3, px: 3 }}
              onClick={onAbrirSituacion}
             >
              <Typography>Situaciones terapéuticas</Typography>
            </Button>
          </Stack>
      </Stack>)}
    </Stack>
  );
}
