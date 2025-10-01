import { useState } from "react";
import {Box,Typography,Paper,Stack,Dialog,DialogTitle,DialogContent,DialogActions,Button,Checkbox} from "@mui/material";
import situacionesMock from "../data/situacionesTerapeuticas";
import { BotonCrearSituacion } from "./BotonCrearSituacion";
import { BotonBajaSituacion } from "./BotonBajaSituacion";
import FormularioSituacionTerapeutica from "./FormularioCrearSituacion";


export function SituacionTerapeutica({ datoSeleccionado, onCerrarSituacion }) {
  const [situacionSeleccionada, setSituacionSeleccionada] = useState(null);
  const [crearSituacion,setCrearSituacion]=useState(false)


  // Estado para manejar las situaciones, inicializado desde localStorage o con el mock
  const [situaciones, setSituaciones] = useState(() => {
    const guardadas = localStorage.getItem("situaciones");
    if (guardadas) {
      return JSON.parse(guardadas);
    } else {
      localStorage.setItem("situaciones", JSON.stringify(situacionesMock));
      return situacionesMock;
    }
  });
  // filtado de situaciones por nroafiliado y si se elige por las de el prestador logueado
  const situacionesFiltradas = situaciones
    .filter((h) => h.nroAfiliado === datoSeleccionado?.nroAfiliado)

  // funcion temporal para restaurar el estado original del mock
  const restaurarSituaciones = () => {
    localStorage.setItem("situaciones", JSON.stringify(situacionesMock));
    setSituaciones(situacionesMock);
    setSituacionSeleccionada(null);
  };

  return (
    <Stack m={3} sx={{ alignContent: "center", height: "100%" }}>
      <Box width="90%" mx="auto" mb={2}>
        <Typography variant="h4" sx={{ textAlign: "center", color: "black" }}>
          Situaciones Terapeuticas
        </Typography>
        <Stack direction="row" justifyContent="space-between" px={2}>
          <Button variant="outlined" onClick={onCerrarSituacion}>Volver</Button>
          <Button variant="outlined" onClick={restaurarSituaciones}>Restaurar datos</Button>
        </Stack>
      </Box>

      {/* <Stack height="100%" width="90%" mx="auto" bgcolor="grey" borderRadius={3} p={4}>
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
 */}
        <Stack
          spacing={2}
          
          sx={{
            overflowY: "auto",
            maxHeight: "60vh",
            width: "100%",
            mb: 3,
          }}
        >
          {situacionesFiltradas.length === 0 ? (
            <Box sx={{ alignContent: "center", height: "100%" }}>
              <Stack sx={{ alignItems: "center" }}>
                <Typography>No cuenta con situaciones terapéuticas registradas</Typography>
              </Stack>
            </Box>
          ) : (
            <Stack>
              {situacionesFiltradas.map((situacion) => (
                <Paper
                  key={situacion.id}
                  elevation={3}
                  onClick={() => setSituacionSeleccionada(situacion)}
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
                    {situacion.nombre}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Fecha: {situacion.fechaInicio}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          )}
        </Stack>
        <Button onClick={() => setCrearSituacion(true)} variant="contained">Crear Situación</Button>
       
       <Dialog
          open={!!crearSituacion}
          onClose={() => setCrearSituacion(null)}
        >
          <FormularioSituacionTerapeutica/>
        </Dialog>


        <Dialog
          open={!!situacionSeleccionada}
          onClose={() => setSituacionSeleccionada(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Detalle de Situación Terapéutica</DialogTitle>
          <DialogContent
            dividers
            sx={{ textAlign: "center", backgroundColor: "#E6E6E6" }}
          >
            <Box mb={2} bgcolor="white" p={2} borderRadius={2}>
              <Typography variant="subtitle2">Título</Typography>
              <Typography>{situacionSeleccionada?.nombre}</Typography>
            </Box>
            <Box mb={2} bgcolor="white" p={2} borderRadius={2}>
              <Typography variant="subtitle2">Fecha Inicio</Typography>
              <Typography>{situacionSeleccionada?.fechaInicio}</Typography>
            </Box>
            <Box mb={2} bgcolor="white" p={2} borderRadius={2}>
              <Typography variant="subtitle2">Fecha Final</Typography>
              <Typography>{situacionSeleccionada?.fechaFinal}</Typography>
            </Box>
            <Box mb={2} bgcolor="white" p={2} borderRadius={2}>
              <Typography variant="subtitle2">Notas</Typography>
              <Typography whiteSpace="pre-line">
                {situacionSeleccionada?.notas}
              </Typography>
            </Box>
            <DialogActions>
            <BotonBajaSituacion
              situacion={situacionSeleccionada}
              onBorrado={(nuevasSituaciones) => {
                setSituaciones(nuevasSituaciones);
                setSituacionSeleccionada(null);
              }}
            />
            <Button onClick={() => setSituacionSeleccionada(null)}>Cerrar</Button>
          </DialogActions>

          </DialogContent>
        </Dialog>
      </Stack>
  );
}