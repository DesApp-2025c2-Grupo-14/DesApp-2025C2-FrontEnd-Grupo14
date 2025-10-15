import { Stack } from "@mui/material";
import { CalendarioChico } from "../components/CalendarioChico";
import { CalendarioGrande } from "../components/CalendarioGrande";
import { TurnosDiarios} from "../components/TurnosDiarios"
import { Header } from "../components/Header";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export function Calendario() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

  <Stack direction='column' width='100%' height='100%' bgcolor='#F2F2F2' >
    <Header seccion='Calendario' usuario='Ariel Nuñez' />
    <Stack direction="row" spacing={4}  px={2} height="90%">
      <Stack direction="column" paddingInline={1} sx={{ minWidth:"320px", bgcolor: "#aec3f3", borderRadius: 3, border: "2px solid"}}>
        <CalendarioChico/>
        <TurnosDiarios/>
      </Stack>
      
      <Stack width="100%" paddingLeft="10px" sx={{ bgcolor: "#F9F9FF",   borderRadius: 3, border: "2px solid"}}>
      <CalendarioGrande/>
      </Stack>

    </Stack>
  </Stack>
    </LocalizationProvider>
  )
}
