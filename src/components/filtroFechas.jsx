import { useState, useEffect} from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/es';

export default function FiltroFechas  ({ onChange,  modo = "normal"  }) {
    const [eleccion, setEleccion] = useState("mes");
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");
    const [mesSeleccionado, setMesSeleccionado] = useState(dayjs());

    useEffect(() => {
        const inicioMes = dayjs().startOf("month").format("YYYY-MM-DD");
        const finMes = dayjs().endOf("month").format("YYYY-MM-DD");
        onChange({ desde: inicioMes, hasta: finMes });
    }, []);
    const handleSeleccion = (value) => {
        setEleccion(value);

        if (value === "todo") {
            onChange({desde: null, hasta: null});
            return;
        }

        if (value === "mes") {
           const inicioMes = dayjs().startOf("month").format("YYYY-MM-DD");
           const finMes = dayjs().endOf("month").format("YYYY-MM-DD");
           onChange({desde: inicioMes, hasta: finMes});
           return;
        }
        if (value === "mesElegir" && modo === "historiaClinica") {
    }
        if (value === "rango" && modo !== "historiaClinica") {
            onChange({desde: desde || null, hasta: hasta || null});
            return;
        }


    };
 // para historia clinica
  const handleMesChange = (value) => {
    setMesSeleccionado(value);
    onChange({
      desde: value.startOf("month").format("YYYY-MM-DD"),
      hasta: value.endOf("month").format("YYYY-MM-DD"),
    });

  };
  const handleDesde = (value) => {
    setDesde(value);
    onChange({ desde: value, hasta });
  };

  const handleHasta = (value) => {
    setHasta(value);
    onChange({ desde, hasta: value });
  };

  return (
    <Box display="flex" gap={2} alignItems="center">
      {/* Selector general */}
      <TextField
        select
        label="Filtro de fechas"
        value={eleccion}
        onChange={(e) => handleSeleccion(e.target.value)}
        sx={{ width: 200 }}
      >
        <MenuItem value="todo">Todo</MenuItem>
        <MenuItem value="mes">Este mes</MenuItem>
        {modo !== "historiaClinica" && <MenuItem value="rango">Elegir rango</MenuItem>}
        {modo === "historiaClinica" && <MenuItem value="mesElegir">Elegir fecha</MenuItem>}
      </TextField>

    {eleccion === "mesElegir" && modo === "historiaClinica" && (
         <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <DatePicker
          views={["year", "month"]}
          label="Mes y Año"
          value={mesSeleccionado}
          onChange={handleMesChange}
          format="MMMM YYYY"
        />
        </LocalizationProvider>
      )}

      {/* Solo modo normal: rango con dos fechas */}
      {eleccion === "rango" && modo !== "historiaClinica" && (
        <>
          <TextField
            type="date"
            label="Desde"
            value={desde}
            onChange={(e) => handleDesde(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="date"
            label="Hasta"
            value={hasta}
            onChange={(e) => handleHasta(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </>
      )}
    </Box>
  );
}