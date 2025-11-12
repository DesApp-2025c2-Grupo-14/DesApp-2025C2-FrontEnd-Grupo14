import { Stack, Box, Typography} from "@mui/material";
import { TurnoDiario } from "../components/TurnoDiario";
import { useState, useEffect } from 'react';
import  dayjs  from "dayjs";

export function TurnosDiarios(props) {
  const [turnosHoy,setTurnosHoy] = useState([])

  useEffect(() => {
    const hoy = dayjs(props.fechaSeleccionada);
    const inicioDelDia = hoy.startOf("day");
    const finDelDia = hoy.endOf("day");

    const turnosfiltrados = props.turnos.filter(t => {
      const fechaTurno = dayjs(t.fechaHora);
      return fechaTurno.isAfter(inicioDelDia) && fechaTurno.isBefore(finDelDia);
    });
    setTurnosHoy(turnosfiltrados)
    console.log("Turnos de hoy:", turnosfiltrados);
  }, [props.fechaSeleccionada, props.turnos]);
  

  return (
    <Stack>
      <Box>
        <Typography>Turnos del día {props.fechaSeleccionada?.format("DD/MM")}</Typography>
      </Box>

      <Stack spacing={2} sx={{ maxHeight: "45dvh", overflowY: "auto" }}>
        {turnosHoy.length > 0 ? (
          turnosHoy.map((turno) => (
            <TurnoDiario
              key={turno._id}
              turno={turno}
            />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No hay turnos para hoy
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
