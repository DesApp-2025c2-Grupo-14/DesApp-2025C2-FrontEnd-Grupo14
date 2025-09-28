import { useContext } from "react";
import { DatosContext } from "../context/datos";
import { Box, Typography, Stack, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export function InfoPaciente({ onAbrirHistoria }) {
  const { datoSeleccionado } = useContext(DatosContext);

  return (
    <Stack m={3} sx={{ alignContent: "center", height: "100%" }}>
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
          width="100%"
          bgcolor="grey"
          borderRadius={3}
          p={2}
        >
          <Stack direction="column" alignItems="center">
            <Stack px={3} width={200} textAlign="center">
              <Typography px={5}>Integrante</Typography>
              <Box bgcolor="white" borderRadius={5}>
                <Typography>
                  {datoSeleccionado.nombre} {datoSeleccionado.apellido}
                </Typography>
              </Box>
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="space-evenly">
            <Stack px={3} width={200} textAlign="center">
              <Typography px={5}>Parentesco</Typography>
              <Box bgcolor="white" borderRadius={5}>
                <Typography>{datoSeleccionado.parentesco}</Typography>
              </Box>
            </Stack>

            <Stack px={3} width={200} textAlign="center">
              <Typography px={5}>DNI</Typography>
              <Box bgcolor="white" borderRadius={5}>
                <Typography>{datoSeleccionado.dni}</Typography>
              </Box>
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="space-evenly">
            <Stack px={3} width={200} textAlign="center">
              <Typography px={5}>Documento</Typography>
              <Box bgcolor="white" borderRadius={5}>
                <Typography>{datoSeleccionado.dni}</Typography>
              </Box>
            </Stack>

            <Stack px={3} width={200} textAlign="center">
              <Typography px={5}>Afiliado</Typography>
              <Box bgcolor="white" borderRadius={5}>
                <Typography>{datoSeleccionado.nroAfiliado}</Typography>
              </Box>
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="space-evenly">
            <Stack px={3} width={200} textAlign="center">
              <Typography px={5}>Plan Médico</Typography>
              <Box bgcolor="white" borderRadius={5}>
                <Typography>PlanMedico</Typography>
              </Box>
            </Stack>

            <Stack px={3} width={200} textAlign="center">
              <Typography px={5}>Teléfono</Typography>
              <Box bgcolor="white" borderRadius={5}>
                <Typography>{datoSeleccionado.telefono}</Typography>
              </Box>
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

            <Button variant="contained" sx={{ borderRadius: 3, px: 3 }}>
              <Typography>Situaciones terapéuticas</Typography>
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
