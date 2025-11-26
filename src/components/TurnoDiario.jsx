import { useContext } from "react";
import { PrestadorContext } from "../context/PrestadorContext";
import { Box, Stack, Typography } from "@mui/material";
import Dayjs  from "dayjs";

export function TurnoDiario({turno}) {
  const { prestador } = useContext(PrestadorContext);
  const horaInicio = Dayjs(turno.fechaHora);
  const horaFinal = horaInicio.add(1,"hour");

  return(
    <Box>
      <Stack direction= "row">
        <Box
                sx={{
                  width: 15,
                  height: 15,
                  borderRadius: "100%",
                  bgcolor: "green",
                  marginTop:"5px"
                }}></Box>
        <Box sx={{marginInline :"10px"}}>
          {prestador.centroMedico?(
            <>
              <Typography variant="h6">
                {turno.pacienteId?.nombre} {turno.pacienteId.apellido}
              </Typography>
              <Typography >{turno.prestadorId.nombre}</Typography>
              <Typography >{horaInicio.format("HH:mm")} - {horaFinal.format("HH:mm") }</Typography>
              <Typography > ({turno.prestadorId.especialidad})</Typography>
            </>
          ) : (
            <>
            <Typography variant="h6">{turno.pacienteId?.nombre} {turno.pacienteId.apellido}</Typography>            
            <Typography >{horaInicio.format("HH:mm")} - {horaFinal.format("HH:mm") }</Typography>
            </>
          )}
        </Box>
      </Stack>
    </Box>
  )  
}