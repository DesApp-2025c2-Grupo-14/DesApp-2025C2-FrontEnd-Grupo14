import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import historiasData from "../data/historiasClinicas";
import { IconButton } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';



export function HistoriaClinica({ datoSeleccionado, onCerrarHistoria }) {
  const [historiaSeleccionada, setHistoriaSeleccionada] = useState(null);
  const [verSoloMisNotas, setVerSoloMisNotas] = useState(false);
  const usuarioActual = "Dr. Peralta";
    const historiasFiltradas = historiasData
    .filter(historia => historia.nroAfiliado === datoSeleccionado?.nroAfiliado)
    .filter(historia => !verSoloMisNotas || historia.prestador === usuarioActual);


  return (
    <Stack m={3} sx={{ alignContent: "center", height: "100%" }}>
      <Box mb={2}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
          Historial Clínico
        </Typography>
        <Button onClick={onCerrarHistoria}>Volver</Button>
      </Box>
      
      <Stack
        height="100%"
        width="90%"
        bgcolor="grey"
        borderRadius={3}
        p={4}
      >
      <Box mb={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        Ver mis notas
        <Checkbox
          checked={verSoloMisNotas}
          onChange={(e) => setVerSoloMisNotas(e.target.checked)}
        />
      </Box>

        <Stack
          spacing={2}
          alignItems="center"
          sx={{
            overflowY: "auto",
            maxHeight: "60vh",
            width: "100%",
            mb: 3,
          }}
        >
          {historiasFiltradas.length == 0 ? (
            <Box sx={{ alignContent: "center", height: "100%" }}>
              <Stack sx={{ alignItems: "center" }}>
                <Typography>Historial Clinico</Typography>
                <Typography>
                  No cuenta con historias clínicas registradas
                </Typography>
              </Stack>
            </Box>
          ) : (
            <Stack>
              {historiasFiltradas.map((historia, index) => (
                <Paper
                  key={index}
                  elevation={3}
                  onClick={() => setHistoriaSeleccionada(historia)}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "white",
                    width: "90%",
                    maxWidth: 600,
                    textAlign: "center",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {historia.titulo}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Fecha: {historia.fecha}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          )}
        </Stack>

        <Dialog
          open={!!historiaSeleccionada}
          onClose={() => setHistoriaSeleccionada(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Detalle de Historia Clínica</DialogTitle>
          <DialogContent
            dividers
            sx={{
              textAlign: "center",
              paddingBottom: 2,
              backgroundColor: "#E6E6E6",
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Título
            </Typography>
            <Box
              mb={2}
              sx={{ backgroundColor: "white", padding: 1, borderRadius: 2 }}
            >
              <Typography>{historiaSeleccionada?.titulo}</Typography>
            </Box>
            <Typography variant="subtitle2" color="text.secondary">
              Fecha
            </Typography>
            <Box
              mb={2}
              sx={{ backgroundColor: "white", padding: 1, borderRadius: 2 }}
            >
              <Typography>{historiaSeleccionada?.fecha}</Typography>
            </Box>
            <Typography variant="subtitle2" color="text.secondary">
              Prestador
            </Typography>
            <Box
              mb={2}
              sx={{ backgroundColor: "white", padding: 1, borderRadius: 2 }}
            >
              <Typography>{historiaSeleccionada?.prestador}</Typography>
            </Box>
            <Typography variant="subtitle2" color="text.secondary">
              Notas
            </Typography>
            <Box
              mb={2}
              sx={{ backgroundColor: "white", padding: 1, borderRadius: 2 }}
            >
              <Typography whiteSpace="pre-line">
                {historiaSeleccionada?.notas}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHistoriaSeleccionada(null)}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Stack>
  );
}
