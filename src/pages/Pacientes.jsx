/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import { DatosProvider  } from "../context/datos";
import { BuscadorPacientes } from "../components/BuscadorPacientes";
import { InfoContainer } from "../components/InfoContainer";
import { Header } from '../components/Header';


export function Pacientes(props) {
  return (
    <Stack direction='column' width='100%' height='100%' bgcolor='#F2F2F2' >
      <Header seccion='Pacientes' usuario='Ariel Nuñez' />
      <Stack direction="row" spacing={4}  px={2} height="90%">
        <DatosProvider>
          <Stack width="50%" padding="30px" sx={{ bgcolor: "#aec3f3", borderRadius: 3, border: "2px solid"}}>
            <BuscadorPacientes/>
          </Stack>
          <Stack width="100%" paddingLeft="10px" sx={{ bgcolor: "#F9F9FF",   borderRadius: 3, border: "2px solid"}}>
            <InfoContainer vista = {props.vista}/>
          </Stack>
        </DatosProvider>
      </Stack>
    </Stack>
  );
}
