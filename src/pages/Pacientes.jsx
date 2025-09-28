import { Stack } from "@mui/material";
import { DatosProvider  } from "../context/datos";
import { BuscadorPacientes } from "../components/BuscadorPacientes";
import { InfoContainer } from "../components/InfoContainer";
import { Header } from '../components/Header';


export function Pacientes(props) {
  console.log(props);

  return (
    <Stack direction='column' width='100%' height='100%' paddingLeft={2} bgcolor='#FCE2B2' spacing={2}>
      <Stack direction='row' width='100%' paddingTop={2}>
        <Header seccion='Bandeja de entrada' usuario='Ariel Nuñez' />
      </Stack>
      <Stack direction="row" spacing={4} height="90%">
        <DatosProvider>
          <Stack width="50%" padding="30px" sx={{ bgcolor: "rgba(255, 255, 255, 1)", borderRadius: 3, border: "2px solid"}}>
            <BuscadorPacientes />
          </Stack>
          <Stack width="100%" paddingLeft="10px" sx={{ bgcolor: "rgba(253, 252, 250, 1)",   borderRadius: 3, border: "2px solid"}}>
            <InfoContainer />
          </Stack>
        </DatosProvider>
      </Stack>
    </Stack>
  );
}
