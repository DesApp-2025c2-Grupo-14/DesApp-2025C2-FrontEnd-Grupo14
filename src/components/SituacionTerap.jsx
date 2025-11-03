import { useState, useEffect } from "react";
import {Box,Typography,Paper,Stack,Dialog,DialogTitle,DialogContent,DialogActions,Button,Checkbox} from "@mui/material";
<<<<<<< HEAD
//import situacionesMock from "../data/situacionesTerapeuticas";
=======
import situacionesMock from "../data/situacionesTerapeuticas";
>>>>>>> bab8602 (Agrego solicitudes con detallo y graficos)
import { BotonCrearSituacion } from "./BotonCrearSituacion";
import { BotonBajaSituacion } from "./BotonBajaSituacion";
import FormularioSituacionTerapeutica from "./FormularioCrearSituacion";
import dayjs from 'dayjs';
import axios from "axios";

export function SituacionTerapeutica({ datoSeleccionado, onCerrarSituacion }) {
<<<<<<< HEAD
  const [situacionSeleccionada, setSituacionSeleccionada] = useState(null);
  const [situaciones, setSituaciones] = useState([]);
=======
  const [situacionSeleccionada, setSituacionSeleccionada] = useState();
>>>>>>> bab8602 (Agrego solicitudes con detallo y graficos)
  const [error, setError] = useState(null);
  const [crearSituacion,setCrearSituacion]=useState(false)
  const [nuevaFechaFinal, setNuevaFechaFinal] = useState("");

  console.log("situacion", situacionSeleccionada)
<<<<<<< HEAD
/*   // Estado para manejar las situaciones, inicializado desde localStorage o con el mock
=======
   // Estado para manejar las situaciones, inicializado desde localStorage o con el mock
>>>>>>> bab8602 (Agrego solicitudes con detallo y graficos)
  const [situaciones, setSituaciones] = useState(() => {
    const guardadas = localStorage.getItem("situaciones");
    if (guardadas) {
      return JSON.parse(guardadas);
    } else {
      localStorage.setItem("situaciones", JSON.stringify(situacionesMock));
      return situacionesMock;
    }
<<<<<<< HEAD
  }); */

/*   // filtado de situaciones por nroafiliado 
  const situacionesFiltradas = situaciones
    .filter((h) => h.nroAfiliado === datoSeleccionado?.nroAfiliado) */

/*   // funcion temporal para restaurar el estado original del mock
=======
  }); 

   // filtado de situaciones por nroafiliado 
  const situacionesFiltradas = situaciones
    .filter((h) => h._id === datoSeleccionado?._id) 

  // funcion temporal para restaurar el estado original del mock
>>>>>>> bab8602 (Agrego solicitudes con detallo y graficos)
  const restaurarSituaciones = () => {
    localStorage.setItem("situaciones", JSON.stringify(situacionesMock));
    setSituaciones(situacionesMock);
    setSituacionSeleccionada(null);
<<<<<<< HEAD
  }; */
=======
  }; 
>>>>>>> bab8602 (Agrego solicitudes con detallo y graficos)

useEffect(() => {
  if (situacionSeleccionada) {
    const fechaFinal = situacionSeleccionada.fechaFinal;
    setNuevaFechaFinal(fechaFinal || "");
  }
}, [situacionSeleccionada]);


  useEffect(()=>{
<<<<<<< HEAD
    if(!datoSeleccionado?.nroAfiliado){
=======
    if(!datoSeleccionado?._id){
>>>>>>> bab8602 (Agrego solicitudes con detallo y graficos)
      setSituaciones([]);
      return;
    }

    const fetchSituaciones = async () =>{
      setError(null)
      try{
<<<<<<< HEAD
        const response = await axios.get(`http://localhost:3000/pacientes/${datoSeleccionado.nroAfiliado}/situacionesTerapeuticas`);
=======
        const response = await axios.get(`http://localhost:3000/pacientes/${datoSeleccionado._id}/situacionesTerapeuticas`);
>>>>>>> bab8602 (Agrego solicitudes con detallo y graficos)
        setSituaciones(response.data.situaciones);
      }catch(err){
      setError("Error al cargar las situaciones terapéuticas.");
      setSituaciones([]);
      }
    }
    fetchSituaciones();
  },[datoSeleccionado]);

<<<<<<< HEAD
/*   const guardarFechaFinal = () => {
=======
  /*
  const guardarFechaFinal = () => {
>>>>>>> bab8602 (Agrego solicitudes con detallo y graficos)
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
<<<<<<< HEAD
  }; */
=======
  };
  */ 
>>>>>>> bab8602 (Agrego solicitudes con detallo y graficos)
  const borrarSituacion = async () =>{
        try {
          // uso el delete del back para borrar la situacion
          await axios.delete(`http://localhost:3000/pacientes/${situacionSeleccionada._id}/eliminarSituacion`);
          //creo la nueva lista sin la situacion
          const nuevasSituaciones = situaciones.filter(s => s._id !== situacionSeleccionada._id);
          //actualizo la lista
          setSituaciones(nuevasSituaciones);
          setSituacionSeleccionada(null);
        } catch (error) {
          alert("No se pudo borrar la situación.");
          console.error(error);
        }
  }  
<<<<<<< HEAD
=======
  
>>>>>>> bab8602 (Agrego solicitudes con detallo y graficos)
  const guardarFechaFinal = async () => {
  try {// el put para cambiar fecha Final
    const response = await axios.patch(`http://localhost:3000/pacientes/${situacionSeleccionada._id}/situacion`,{ fechaFinal: nuevaFechaFinal });
    const nuevasSituaciones = situaciones.map((s) =>
      s._id === situacionSeleccionada._id ? response.data : s
    );
    //actualizo el estado de las situaciones con lo nuevo
    setSituaciones(nuevasSituaciones);
    setSituacionSeleccionada(response.data);
  } catch (error) {
    console.error("Error al guardar la fecha final:", error);
    alert("No se pudo modificar la fecha final");
<<<<<<< HEAD
  }
};

=======
    }
  };
  
>>>>>>> bab8602 (Agrego solicitudes con detallo y graficos)
  const agregarSituacion = async (nuevaSituacion)=>{
    try{
      const datos ={
        ...nuevaSituacion,
        // aca armo la situacion para mandarla al back, pasando las fechas al formato necesario 
        fechaInicio: nuevaSituacion.fechaInicio.toISOString(),
        fechaFinal: nuevaSituacion.fechaFinal ? nuevaSituacion.fechaFinal.toISOString() : null
      }
      // post de situaciones usando id para crear
      const res = await axios.post(`http://localhost:3000/pacientes/${datoSeleccionado._id}/crearSituacion`, datos)
      // recupero la situacion del back ya creada
      const situacionNueva = res.data.situacion
      // actualizo la lista con el nuevo estado
      setSituaciones((prevSituaciones) => [...prevSituaciones, situacionNueva]);
      setCrearSituacion(false);
    }catch(error){
    console.error("Error al crear la nueva situacion:", error);
    alert("No se pudo crear la nueva situacion");
<<<<<<< HEAD
}
  }
  
/*   const agregarSituacion = (nuevaSituacion) => {
=======
      }
    }
  /*
    const agregarSituacion = (nuevaSituacion) => {
>>>>>>> bab8602 (Agrego solicitudes con detallo y graficos)
    const nuevasSituaciones = [...situaciones, nuevaSituacion];
    setSituaciones(nuevasSituaciones);
    localStorage.setItem("situaciones", JSON.stringify(nuevasSituaciones));
    setCrearSituacion(false);
  };
<<<<<<< HEAD
  console.log("situacionSelec:", situacionSeleccionada) */
=======
  */
  console.log("situacionSelec:", situacionSeleccionada) 
>>>>>>> bab8602 (Agrego solicitudes con detallo y graficos)
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
<<<<<<< HEAD
       <Dialog
=======
        <Dialog
>>>>>>> bab8602 (Agrego solicitudes con detallo y graficos)
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
            {/* boton actualizado que solo ejecuta borrarsituacion */}
            <BotonBajaSituacion onBorrado={borrarSituacion} />
            {/* aca se bloquea el boton hasta ingresar fecha */}
            <Button onClick={guardarFechaFinal} disabled={!nuevaFechaFinal}>
              Modificar Fecha Final
            </Button>
          </DialogActions>
        </Dialog>
      )}
      </Stack>
  );
}

