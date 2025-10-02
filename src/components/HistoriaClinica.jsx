import { useState } from "react";
import {Box,Typography,Paper,Stack,Dialog,DialogTitle,DialogContent,DialogActions,Button,Checkbox} from "@mui/material";
import historiasMock from "../data/historiasClinicas";

export function HistoriaClinica({ datoSeleccionado, onCerrarHistoria }) {
  const [historiaSeleccionada, setHistoriaSeleccionada] = useState(null);
  const [verSoloMisNotas, setVerSoloMisNotas] = useState(false);

  // Simulo el prestador logueado
  const usuarioActual = "Dr. Buenavida";

  // Estado para manejar las historias clínicas, inicializado desde localStorage o con el mock
  const [historias, setHistorias] = useState(() => {
    const guardadas = localStorage.getItem("historias");
    if (guardadas) {
      return JSON.parse(guardadas);
    } else {
      localStorage.setItem("historias", JSON.stringify(historiasMock));
      return historiasMock;
    }
  });
  // filtado de historias por nroafiliado y si se elige por las de el prestador logueado
  const historiasFiltradas = historias
    .filter((h) => h.nroAfiliado === datoSeleccionado?.nroAfiliado)
    .filter((h) => !verSoloMisNotas || h.prestador === usuarioActual);

  // funcion temporal para restaurar el estado original del mock
  const restaurarHistorias = () => {
    localStorage.setItem("historias", JSON.stringify(historiasMock));
    setHistorias(historiasMock);
    setHistoriaSeleccionada(null);
  };

  return (
<Stack sx={{ alignContent: "center", height: "100%" }}>
  <Box mwidth="90%" x="auto" mb={2} marginRight={5}>
        <Typography variant="h4" sx={{ textAlign: "center", color: "#1976d2"  }} marginTop={2}>
          Historial Clínico
        </Typography>
    <Stack direction="row" justifyContent="space-between" px={2}>
      <Button variant="outlined" onClick={onCerrarHistoria}>Volver</Button>
      <Button variant="outlined" onClick={restaurarHistorias}>Restaurar datos</Button>
    </Stack>
  </Box>

      <Stack height="100%" width="90%" m="auto" marginBottom={3} borderRadius={3} p={4}>
        <Box mb={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box
          sx={{display: "flex",alignItems: "center",backgroundColor: "white",
            padding: "4px 8px",borderRadius: 1,fontSize: "0.875rem",width: "fit-content"
    }} >
            <Typography sx={{ mr: 1 }}>Ver mis notas</Typography>
          <Checkbox
            size="small"
            checked={verSoloMisNotas}
            onChange={(e) => setVerSoloMisNotas(e.target.checked)}
          />
        </Box>
      </Box>

        <Stack
          spacing={2}
          
          sx={{
            overflowY: "auto",
            maxHeight: "60vh",
            width: "100%",
            mb: 3,
          }}
        >
          {historiasFiltradas.length === 0 ? (
            <Box sx={{ alignContent: "center", height: "100%" }}>
              <Stack sx={{ alignItems: "center" }}>
                <Typography sx={{ color: "#1976d2", fontSize: "18px" }}>No cuenta con historias clínicas registradas</Typography>
              </Stack>
            </Box>
          ) : (
            <Stack>
              {historiasFiltradas.map((historia) => (
                <Paper
                  key={historia.id}
                  elevation={3}
                  onClick={() => setHistoriaSeleccionada(historia)}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "white",
                    width: "90%",
                    textAlign: "center",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                    mb: 2
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
            sx={{ textAlign: "center", backgroundColor: "#E6E6E6" }}
          >
            <Box mb={2} bgcolor="white" p={2} borderRadius={2}>
              <Typography variant="subtitle2">Título</Typography>
              <Typography>{historiaSeleccionada?.titulo}</Typography>
            </Box>
            <Box mb={2} bgcolor="white" p={2} borderRadius={2}>
              <Typography variant="subtitle2">Fecha</Typography>
              <Typography>{historiaSeleccionada?.fecha}</Typography>
            </Box>
            <Box mb={2} bgcolor="white" p={2} borderRadius={2}>
              <Typography variant="subtitle2">Prestador</Typography>
              <Typography>{historiaSeleccionada?.prestador}</Typography>
            </Box>
            <Box mb={2} bgcolor="white" p={2} borderRadius={2}>
              <Typography variant="subtitle2">Notas</Typography>
              <Typography whiteSpace="pre-line">
                {historiaSeleccionada?.notas}
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>
      </Stack>
    </Stack>
  );
}
