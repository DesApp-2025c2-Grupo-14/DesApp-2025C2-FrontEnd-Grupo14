import { useState, useEffect } from "react"
import { Stack } from "@mui/material";
import { CalendarioChico } from "../components/CalendarioChico";
import { CalendarioGrande } from "../components/CalendarioGrande";
import { TurnosDiarios} from "../components/TurnosDiarios"
import { Header } from "../components/Header";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import  axios  from "axios";
import  dayjs  from "dayjs";


dayjs.locale("es")

export function Calendario() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null)
  const [turnos, setTurnos] = useState([]);
  
    useEffect(() => {
       async function getTurnos() {
        try {
          const response = await axios.get("http://localhost:3000/turnos");
          console.log("Turnos cargados :",response.data);
          setTurnos(response.data);
        } catch (error) {
          console.error("Error cargando turnos:", error);
        }
      }
      getTurnos();
    }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">

    <Stack direction='column' width='100%' height='100%' bgcolor='#F2F2F2' >
    <Header seccion='Calendario' usuario='Ariel Nuñez' />
    <Stack direction="row" spacing={4}  px={2} height="90%">
      <Stack direction="column" paddingInline={1} sx={{ minWidth:"320px", bgcolor: "#aec3f3", borderRadius: 3, border: "2px solid"}}>
        <CalendarioChico
          fechaSeleccionada={fechaSeleccionada}
          setFechaSeleccionada ={setFechaSeleccionada}
          turnos = {turnos}
        />
        <TurnosDiarios
          fechaSeleccionada ={fechaSeleccionada}
          turnos = {turnos}
        />
      </Stack>
      
      <Stack width="100%" paddingLeft="10px" sx={{ bgcolor: "#F9F9FF",   borderRadius: 3, border: "2px solid"}}>
      <CalendarioGrande
        fechaSeleccionada={fechaSeleccionada}
        setFechaSeleccionada={setFechaSeleccionada}
        turnos = {turnos}
      />
      </Stack>

    </Stack>
  </Stack>
    </LocalizationProvider>
  )
}
