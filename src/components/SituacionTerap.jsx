import { useState, useEffect } from "react";
import {Box,Typography,Paper,Stack,Dialog,DialogTitle,DialogContent,DialogActions,Button,Checkbox} from "@mui/material";
import situacionesMock from "../data/situacionesTerapeuticas";
import { BotonCrearSituacion } from "./BotonCrearSituacion";
import { BotonBajaSituacion } from "./BotonBajaSituacion";
import FormularioSituacionTerapeutica from "./FormularioCrearSituacion";
import dayjs from 'dayjs';

export function SituacionTerapeutica({ datoSeleccionado, onCerrarSituacion }) {
  const [situacionSeleccionada, setSituacionSeleccionada] = useState(null);
  const [crearSituacion,setCrearSituacion]=useState(false)
  const [nuevaFechaFinal, setNuevaFechaFinal] = useState("");


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

  // filtado de situaciones por nroafiliado 
  const situacionesFiltradas = situaciones
    .filter((h) => h.nroAfiliado === datoSeleccionado?.nroAfiliado)

  // funcion temporal para restaurar el estado original del mock
  const restaurarSituaciones = () => {
    localStorage.setItem("situaciones", JSON.stringify(situacionesMock));
    setSituaciones(situacionesMock);
    setSituacionSeleccionada(null);
  };

/*  // efecto usado para cambiar la fecha final
  useEffect(() => {
    if (situacionSeleccionada) {
      setNuevaFechaFinal(situacionSeleccionada.fechaFinal || "");
    }
  }, [situacionSeleccionada]);
  */
 // efecto usado para cambiar la fecha final
  useEffect(() => {
    if (situacionSeleccionada) {
      //
      const fechaISO = situacionSeleccionada.fechaFinal 
        //verifica si hay fecha cargada y si esta la cambia al formato iso que entiende el input
        ? dayjs(situacionSeleccionada.fechaFinal, "DD/MM/YYYY").format("YYYY-MM-DD") : "";
      setNuevaFechaFinal(fechaISO);
    }
  }, [situacionSeleccionada]); 


  const guardarFechaFinal = () => {
    const fechaFormato = dayjs(nuevaFechaFinal).format("DD/MM/YYYY"); 
    // buscar la situacion seleccionada y crea un nuevo array con la fecha final actualizada
    const nuevasSituaciones = situaciones.map((s) =>
      s.id === situacionSeleccionada.id
        ? { ...s, fechaFinal: fechaFormato }
        : s
    );
    // actualizar estado de situaciones
    setSituaciones(nuevasSituaciones);
    // guardar nuevo array en localStorage
    localStorage.setItem("situaciones", JSON.stringify(nuevasSituaciones));
    setSituacionSeleccionada({ ...situacionSeleccionada, fechaFinal: fechaFormato });
  };

  const agregarSituacion = (nuevaSituacion) => {
    const nuevasSituaciones = [...situaciones, nuevaSituacion];
    setSituaciones(nuevasSituaciones);
    localStorage.setItem("situaciones", JSON.stringify(nuevasSituaciones));
    setCrearSituacion(false);
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
          <FormularioSituacionTerapeutica
            nroAfiliado={datoSeleccionado?.nroAfiliado}
            onGuardar={agregarSituacion}
            onCancelar={() => setCrearSituacion(false)}
          />
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
                <Typography variant="body2" color="text.secondary">
                  {/* muestra la fecha asignada si existe */}
                  Actual: {situacionSeleccionada?.fechaFinal || "No asignada"}
                </Typography>
                <input
                  type="date"
                  value={nuevaFechaFinal}
                  /* actualizar estado */
                  onChange={(e) => setNuevaFechaFinal(e.target.value)}
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginTop: "8px"
                  }}
                />
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
            {/* <Button onClick={() => setSituacionSeleccionada(null)}>Cerrar</Button> */}
            <Button onClick={guardarFechaFinal} disabled={!nuevaFechaFinal}>
              Guardar Fecha Final
            </Button>
          </DialogActions>

          </DialogContent>
        </Dialog>
      </Stack>
  );
}

