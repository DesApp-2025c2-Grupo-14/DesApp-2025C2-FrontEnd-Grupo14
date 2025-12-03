import { useEffect, useState } from "react";
import {Box,Typography,Paper,Stack,Dialog,DialogTitle,DialogContent,DialogActions,Button,Checkbox} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import FiltroFecha from "./filtroFechas.jsx";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/es";
import utc from "dayjs/plugin/utc";


dayjs.locale("es");
dayjs.extend(utc);

export function HistoriaClinica({ datoSeleccionado, onCerrarHistoria, prestador }) {
  const [historias, setHistorias] = useState([])
  const [historiaSeleccionada, setHistoriaSeleccionada] = useState(null);
  const [verSoloMisNotas, setVerSoloMisNotas] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null); // para verificacion de errores en el momento de carga
  const { dato } = useParams(); // guarda el valor que viene de :idPaciente de la ruta
  const [filtroFecha, setFiltroFecha] = useState({ desde: null, hasta: null }); // estado para el filtro de fechas


  // Simulo el prestador logueado
  //const prestadorLogueado = prestador
  const handleFiltro = (nuevoFiltro) => {
    setFiltroFecha(nuevoFiltro);
  };
  /* //console.log("Prestador logueado:", prestador); */
/*   console.log("ID prestador desde React:", prestador);
console.log("prestador._id:", prestador?._id);
console.log("prestador.id:", prestador?.id); */

  useEffect(()=>{
    const fetchHistorias = async ()=>{
      setError(null)
      try{
        const idPaciente = dato || datoSeleccionado._id;
        if (!idPaciente) return;
        
        const url = `http://localhost:3000/pacientes/${idPaciente}/historiasClinicas`;
        // para filtrar las notas por prestador
        //const params = verSoloMisNotas ? { prestador: usuarioActual } : {};
        const params = {
          prestadorId: verSoloMisNotas ? prestador?._id : undefined,
          desde: filtroFecha.desde || undefined,
          hasta: filtroFecha.hasta || undefined,
        };
        
        // la peticion con el parametro de ver notas si esta activo
        const response = await axios.get(url, { params });
        setHistorias(response.data.historial);

      } catch(err){
        setError("Error al cargar las historias clínicas.");
        setHistorias([]);
      }
    }
    fetchHistorias();
  }, [dato,datoSeleccionado._id, verSoloMisNotas, filtroFecha, prestador ]);
  
  return (
<Stack sx={{ alignContent: "center", height: "100%" }}>
  <Box mwidth="90%" x="auto" mb={2} marginRight={5}>
        <Typography variant="h4" sx={{ textAlign: "center", color: "#1976d2"  }} marginTop={2}>
          Historial Clínico
        </Typography>
    <Stack direction="row" justifyContent="space-between" px={2}>
      {dato ?
        (<Button variant="outlined" onClick={() => navigate(-1)}>Volver</Button>):        
        (<Button variant="outlined" onClick={onCerrarHistoria}>Volver</Button>)
      }
    </Stack>
  </Box>
      <Stack height="100%" width="90%" m="auto" marginBottom={3} borderRadius={3} p={4}>
        <Box
    mb={2}
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "white",
      padding: "6px 10px",
      borderRadius: 1,
    }}
  >
      <FiltroFecha modo="historiaClinica" onChange={handleFiltro} />
    <Box sx={{ display: "flex", alignItems: "center" }}>
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
          {historias.length === 0 ? (
            <Box sx={{ alignContent: "center", height: "100%" }}>
              <Stack sx={{ alignItems: "center" }}>
                <Typography sx={{ color: "#1976d2", fontSize: "18px" }}>No cuenta con historias clínicas registradas</Typography>
              </Stack>
            </Box>
          ) : (
            <Stack>
              {historias.map((historia) => (
                <Paper
                  key={historia._id}
                  elevation={3}
                  onClick={() => setHistoriaSeleccionada(historia)}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "white",
                    width: "90%",
                    textAlign: "left",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                    mb: 2
                  }}
                >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {historia.titulo}
                </Typography>

                <Typography sx={{ fontSize: "1.2rem" }} gutterBottom>
                  Fecha: {dayjs.utc(historia.fecha).format("DD/MM/YYYY")}
                </Typography>

                <Typography sx={{ fontSize: "1.2rem" }} gutterBottom>
                  Prestador: {historia.prestador}
                </Typography>

                <Typography sx={{ fontSize: "1.2rem" }} gutterBottom>
                  Notas: {historia.notas}
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
              <Typography>{dayjs.utc(historiaSeleccionada?.fecha).format("DD/MM/YYYY")}</Typography>
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