import { useState, useEffect } from "react";
import {Box,Typography,Paper,Stack,Dialog,DialogTitle,DialogContent,DialogActions,Button, Snackbar, Alert } from "@mui/material";
//import situacionesMock from "../data/situacionesTerapeuticas";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { BotonBajaSituacion } from "./BotonBajaSituacion";
import FormularioSituacionTerapeutica from "./FormularioCrearSituacion";
import axios from "axios";

dayjs.extend(utc);


export function SituacionTerapeutica({ datoSeleccionado, onCerrarSituacion }) {
  const [situacionSeleccionada, setSituacionSeleccionada] = useState();
  const [error, setError] = useState(null);
  const [crearSituacion,setCrearSituacion]=useState(false)
  const [nuevaFechaFinal, setNuevaFechaFinal] = useState("");

  //snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [mensajeSnackbar, setMensajeSnackbar] = useState("");
  const [tipoSnackbar, setTipoSnackbar] = useState("success");

useEffect(() => {
  if (situacionSeleccionada) {
    const fechaFinal = situacionSeleccionada.fechaFinal;
    //setNuevaFechaFinal(fechaFinal || "");
    // si existe fechafinal la formateo al formato necesario, eliminado hora, si no hay fecha lo dejo vacio
    setNuevaFechaFinal(fechaFinal ? dayjs(fechaFinal).utc().format("YYYY-MM-DD") : "");
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
        setSituaciones(response.data.situaciones);
      }catch(err){
      setError("Error al cargar las situaciones terapéuticas.");
      setSituaciones([]);
      }
    }
    fetchSituaciones();
  },[datoSeleccionado]);

  const borrarSituacion = async () =>{
        try {
          // uso el patch del back para borrar la situacion de la vista
          await axios.patch(`http://localhost:3000/pacientes/${situacionSeleccionada._id}/eliminarSituacion`);
          //creo la nueva lista sin la situacion
          const nuevasSituaciones = situaciones.filter(s => s._id !== situacionSeleccionada._id);
          //actualizo la lista
          setSituaciones(nuevasSituaciones);
          setSituacionSeleccionada(null);
          // Snackbar confirmacion
          setMensajeSnackbar("Situación dada de baja con éxito");
          setTipoSnackbar("success");
          setOpenSnackbar(true);
        } catch (error) {
          console.error("Error al borrar la situación:", error);
          // Snackbar error
          setMensajeSnackbar("No se pudo dar de baja la situación terapéutica.");
          setTipoSnackbar("error");
          setOpenSnackbar(true);
        }
  }  
  
  const guardarFechaFinal = async () => {
  try {
    // formateo la nueva fecha al formato estandar
    const fechaFinalEstandar = dayjs(nuevaFechaFinal).startOf('day').format('YYYY-MM-DD');
    // el put para cambiar fecha Final
    const response = await axios.patch(`http://localhost:3000/pacientes/${situacionSeleccionada._id}/situacion`,{ fechaFinal: fechaFinalEstandar });
    const nuevasSituaciones = situaciones.map((s) =>
      s._id === situacionSeleccionada._id ? response.data : s
    );
    //actualizo el estado de las situaciones con lo nuevo
    setSituaciones(nuevasSituaciones);
    setSituacionSeleccionada(response.data);
    // Snackbar confirmacion
    setMensajeSnackbar("Fecha final modificada con éxito");
    setTipoSnackbar("success");
    setOpenSnackbar(true);
  } catch (error) {
    console.error("Error al guardar la fecha final:", error);
    // Snackbar error
    setMensajeSnackbar("No se pudo modificar la fecha final.");
    setTipoSnackbar("error");
    setOpenSnackbar(true);
  }
};

  const agregarSituacion = async (nuevaSituacion)=>{
    try{
      const datos ={
        ...nuevaSituacion,
        // aca armo la situacion para mandarla al back, pasando las fechas al formato necesario 
        fechaInicio: dayjs(nuevaSituacion.fechaInicio).startOf('day').format('YYYY-MM-DD'),
        fechaFinal: nuevaSituacion.fechaFinal ? dayjs(nuevaSituacion.fechaFinal).startOf('day').format('YYYY-MM-DD') : null
      }
      // post de situaciones usando id para crear
      const res = await axios.post(`http://localhost:3000/pacientes/${datoSeleccionado._id}/crearSituacion`, datos)
      // recupero la situacion del back ya creada
      const situacionNueva = res.data.situacion
      // actualizo la lista con el nuevo estado
      setSituaciones((prevSituaciones) => [...prevSituaciones, situacionNueva]);
      setCrearSituacion(false);
      // Snackbar confirmacion
      setMensajeSnackbar("Situación creada con éxito");
      setTipoSnackbar("success");
      setOpenSnackbar(true);
    }catch(error){
    console.error("Error al crear la nueva situacion:", error);
    // Snackbar error
    setMensajeSnackbar("No se pudo crear la nueva situacion");
    setTipoSnackbar("error");
    setOpenSnackbar(true);
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
          {/* <Button variant="outlined" onClick={restaurarSituaciones}>Restaurar datos</Button> */}
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
                    p: 4,
                    borderRadius: 3,
                    bgcolor: "white",
                    boxShadow: 3,
                    width: "90%",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "background-color 0.5s ease", // para mostrar mejor el cambio de color
                    "&:hover": {
                      backgroundColor: "#c7b8b87c",
                    },
                    mb: 3
                  }}
                >
                  <Typography variant="h5" fontWeight="bold" >
                    {situacion.titulo}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {/* .utc para evitar desfaces de zona horaria y que muestre correctamente la fecha*/}
                    Fecha Inicio: {dayjs(situacion.fechaInicio).utc().format("DD/MM/YYYY")}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    Fecha Fin: {situacion.fechaFinal ? dayjs(situacion.fechaFinal).utc().format("DD/MM/YYYY") : "No asignada"}
                  </Typography>
                  <Typography variant="body1" color="text.primary" >
                    Descripción: {situacion.descripcion}
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
                {dayjs(situacionSeleccionada.fechaInicio).utc().format("DD/MM/YYYY")}
              </Typography>
            </Box>
            <Box mb={2} bgcolor="white" p={2} borderRadius={2}>
              <Typography variant="subtitle2">Fecha Final</Typography>
              <Typography variant="body2" color="text.secondary">
                Actual:{" "}
                {situacionSeleccionada.fechaFinal
                  ? dayjs(situacionSeleccionada.fechaFinal).utc().format("DD/MM/YYYY")
                  : "No asignada"}
              </Typography>
              <input
                type="date"
                value={nuevaFechaFinal}
                // este min evita seleccionar una fecha anterior a la de inicio
                min={situacionSeleccionada.fechaInicio ? dayjs(situacionSeleccionada.fechaInicio).format("YYYY-MM-DD") : undefined}
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
            {/* boton actualizado que solo ejecuta borrarsituacion */}
            <BotonBajaSituacion onBorrado={borrarSituacion} />

            {/* aca se bloquea el boton hasta ingresar fecha */}
            <Button onClick={guardarFechaFinal} disabled={!nuevaFechaFinal}>
              Modificar Fecha Final
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* componente snackbar usado para mostrar mensajes de confirmacion o error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={tipoSnackbar}
          sx={{ width: "100%" }}
        >
          {mensajeSnackbar}
        </Alert>
      </Snackbar>
      </Stack>
  );
}

