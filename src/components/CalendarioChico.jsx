import * as React from 'react';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

const initialValue = dayjs('2022-04-17');

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? (
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "100%",
          bgcolor: "green",
        }}
      />) : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export function CalendarioChico(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);

  const calcularDiasConTurnos = (date) => {
    if (!date || !dayjs(date).isValid()) return;
    const mesActual = date.month();
    const añoActual = date.year();

    // filtrar los turnos del mes visible
    const diasConTurno = props.turnos
      .map((turno) => dayjs(turno.fechaHora))
      .filter((d) => d.month() === mesActual && d.year() === añoActual)
      .map((d) => d.date()) ||  []; // devolver solo el número de día

    setHighlightedDays(diasConTurno);
  };

  React.useEffect(() => {
    const fecha = props.fechaSeleccionada && dayjs(props.fechaSeleccionada).isValid()
      ? props.fechaSeleccionada
      : dayjs();
    calcularDiasConTurnos(fecha);
  }, [props.turnos, props.fechaSeleccionada])

  const handleMonthChange = (date) => {
    setIsLoading(true);
    if (date && dayjs(date).isValid()) {
      calcularDiasConTurnos(date);
    }
    setIsLoading(false);
  };

  const fechaCalendario = props.fechaSeleccionada && dayjs(props.fechaSeleccionada).isValid()
      ? props.fechaSeleccionada
      : dayjs();

  return (

      <Box sx={{width:"100%"}}>
        <DateCalendar
          value={fechaCalendario}
          onChange={(nuevaFecha)=>props.setFechaSeleccionada(nuevaFecha)}
          loading={isLoading}
          onMonthChange={handleMonthChange}
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {highlightedDays}
          }}
          sx={{
             width:"100%",
            "& .MuiDayCalendar-root": {width: "100%"}}}
        />
      </Box>
  );
}
