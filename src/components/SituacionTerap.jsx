import { useState, useEffect } from "react";
import {Box,Typography,Paper,Stack,Dialog,DialogTitle,DialogContent,DialogActions,Button,Checkbox,Alert} from "@mui/material";
import { BotonCrearSituacion } from "./BotonCrearSituacion";
import { BotonBajaSituacion } from "./BotonBajaSituacion";
import FormularioSituacionTerapeutica from "./FormularioCrearSituacion";
import dayjs from 'dayjs';
import axios from "axios";

export function SituacionTerapeutica({ datoSeleccionado, onCerrarSituacion }) {
  const [situacionSeleccionada, setSituacionSeleccionada] = useState(null);
  const [situaciones, setSituaciones] = useState([]);
  const [error, setError] = useState(null);
  const [crearSituacion,setCrearSituacion]=useState(false)
  const [nuevaFechaFinal, setNuevaFechaFinal] = useState("");

  console.log("situacion", situacionSeleccionada)

  useEffect(() => {
    if (situacionSeleccionada) {
      const fechaFinal = situacionSeleccionada.fechaFinal;
      setNuevaFechaFinal(fechaFinal || "");
    }
  }, [situacionSeleccionada]);

  useEffect(()=>{
    if(!datoSeleccionado?._id){
      setSituaciones([]);
      return;
    }

    const fetchSituaciones = async () =>{
      setError(null)
      try{
        const response = await axios.get(`http://localhost:3000/pacientes/${datoSeleccionado._id}/situacionesTerapeuticas`);
        // ✅ solo mostrar las situaciones NO finalizadas
        const activas = response.data.situaciones.filter((s) => !s.finalizada);
        setSituaciones(activas);
      }catch(err){
      setError("Error al cargar las situaciones terapéuticas.");
      setSituaciones([]);
      }
    }
    fetchSituaciones();
  },[datoSeleccionado]);

  // ✅ CONFIRMACIÓN + marcar como finalizada
  const borrarSituacion = async () =>{
    const confirmar = window.confirm("¿Estás seguro de que querés dar de baja esta situación terapéutica?");
    if (!confirmar) return;

    try {
      // ✅ ahora se marca como finalizada en lugar de borrarse
      await axios.patch(`http://localhost:3000/pacientes/${situacionSeleccionada._id}/situacion`, { finalizada: true });
      // actualizo la lista sin mostrar la finalizada
      const nuevasSituaciones = situaciones.filter(s => s._id !== situacionSeleccionada._id);
      setSituaciones(nuevasSituaciones);
      setSituacionSeleccionada(null);
    } catch (error) {
      alert("No se pudo dar de baja la situación.");
      console.error(error);
    }
  }  

  const guardarFechaFinal = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/pacientes/${situacionSeleccionada._id}/situacion`,{ fechaFinal: nuevaFechaFinal });
      const nuevasSituaciones = situaciones.map((s) =>
        s._id === situacionSeleccionada._id ? response.data : s
      );
      setSituaciones(nuevasSituaciones);
      setSituacionSeleccionada(response.data);
    } catch (error) {
      console.error("Error al guardar la fecha final:", error);
      alert("No se pudo modificar la fecha final");
    }
  };

  const agregarSituacion = async (nuevaSituacion)=>{
    try{
      // ✅ validación visual en lugar de alert
      if(!nuevaSituacion.titulo || !nuevaSituacion.descripcion || !nuevaSituacion.fechaInicio){
        setError("Por favor complete todos los campos obligatorios.");
        return;
      }
      setError("");

      const datos ={
        ...nuevaSituacion,
        fechaInicio: nuevaSituacion.fechaInicio.toISOString(),
        fechaFinal: nuevaSituacion.fechaFinal ? nuevaSituacion.fechaFinal.toISOString() : null
      }
      const res = await axios.post(`http://localhost:3000/pacientes/${datoSeleccionado._id}/crearSituacion`, datos)
      const situacionNueva = res.data.situacion
      setSituaciones((prevSituaciones) => [...prevSituaciones, situacionNueva]);
      setCrearSituacion(false);
    }catch(error){
      console.error("Error al crear la nueva situacion:", error);
      setError("No se pudo crear la nueva situación.");
    }
  }

  return (
    <Stack m={3} sx={{ alignContent: "center", height: "100%" }}>
      <Box width="90%" mx="auto" mb={2}>
        <Typography variant="h4" sx={{ textAlign: "center", color: "#1976d2"  }} marginTop={2}>
          Situaciones Terapeuticas
        </Typography>
        <Stack direction="row" justifyContent="space-between" px={2}>
          <Button variant="outlined" onClick={onCerrarSituacion}>Volver</Button>
        </Stack>
      </Box>

      {error && (
        <Box width="90%" mx="auto" mb={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      <Stack
        spacing={2}
        sx={{
          overflowY: "auto",
          maxHeight: "60vh",
          width: "100%",
          mb: 3,
        }}
      >
        {situaciones.length === 0 ? (
          <Box sx={{ alignContent: "center", height: "100%" }}>
            <Stack sx={{ alignItems: "center" }}>
              <Typography sx={{color: "#1976d2" }}>No cuenta con situaciones terapéuticas registradas</Typography>
            </Stack>
          </Box>
        ) : (
          <Stack>
            {situaciones.map((situacion) => (
              <Paper
                key={situacion._id}
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
                  {situacion.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fecha Inicio: {dayjs(situacion.fechaInicio).format("DD/MM/YYYY")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fecha Fin: {situacion.fechaFinal ? dayjs(situacion.fechaFinal).format("DD/MM/YYYY") : "No asignada"}
                </Typography>
              </Paper>
            ))}
          </Stack>
        )}
      </Stack>

      <Box width="100%" mx="auto" mt="auto" sx={{ display: "flex", justifyContent: "center" }}>
        <Button 
          onClick={() => setCrearSituacion(true)} 
          variant="contained"
        >
          Crear Situación
        </Button>
      </Box>

      <Dialog
        open={!!crearSituacion}
        onClose={() => setCrearSituacion(null)}
      >
        <FormularioSituacionTerapeutica
          onGuardar={agregarSituacion}
          onCancelar={() => setCrearSituacion(false)}
        />
      </Dialog>

      {situacionSeleccionada && (
        <Dialog
          open={true}
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
              <Typography>{situacionSeleccionada.titulo}</Typography>
            </Box>
            <Box mb={2} bgcolor="white" p={2} borderRadius={2}>
              <Typography variant="subtitle2">Fecha Inicio</Typography>
              <Typography>
                {dayjs(situacionSeleccionada.fechaInicio).format("DD/MM/YYYY")}
              </Typography>
            </Box>
            <Box mb={2} bgcolor="white" p={2} borderRadius={2}>
              <Typography variant="subtitle2">Fecha Final</Typography>
              <Typography variant="body2" color="text.secondary">
                Actual:{" "}
                {situacionSeleccionada.fechaFinal
                  ? dayjs(situacionSeleccionada.fechaFinal).format("DD/MM/YYYY")
                  : "No asignada"}
              </Typography>
              <input
                type="date"
                value={nuevaFechaFinal}
                onChange={(e) => setNuevaFechaFinal(e.target.value)}
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  marginTop: "8px",
                }}
              />
            </Box>
            <Box mb={2} bgcolor="white" p={2} borderRadius={2}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography whiteSpace="pre-line">
                {situacionSeleccionada.descripcion}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <BotonBajaSituacion onBorrado={borrarSituacion} />
            <Button onClick={guardarFechaFinal} disabled={!nuevaFechaFinal}>
              Modificar Fecha Final
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Stack>
  );
}