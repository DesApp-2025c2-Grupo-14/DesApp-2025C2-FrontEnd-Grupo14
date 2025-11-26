import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import {
  Select,
  MenuItem,
  Button,
  TextField,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { BasicCard } from "./Card";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import DescriptionIcon from "@mui/icons-material/Description";


const BACKEND_URL = "http://localhost:3000";
dayjs.extend(utc);
dayjs.extend(timezone);

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <Box sx={{ width: "100%" }} hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}


async function getSolicitudes(tipo, rangoAplicado) {
  try {
    const params = {};

    if (tipo) params.tipo = tipo;
    if (rangoAplicado?.[0]) params.desde = rangoAplicado[0].toISOString();
    if (rangoAplicado?.[1]) params.hasta = rangoAplicado[1].toISOString();

    const response = await axios.get(`${BACKEND_URL}/solicitudes`, { params });
    console.log("Solicitudes obtenidas del backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al traer solicitudes:", error);
    return [];
  }
}


const getTipoFromTabIndex = (index) => {
  switch (index) {
    case 1:
      return "Reintegro";
    case 2:
      return "Autorizacion";
    case 3:
      return "Receta";
    default:
      return undefined; // General: sin tipo => todas las pendientes
  }
};


export function Listado(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [solicitudes, setSolicitudes] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(null);
 

  //snackbar
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [mensajeSnackbar, setMensajeSnackbar] = React.useState("");
  const [tipoSnackbar, setTipoSnackbar] = React.useState("success");

  // Filtro de fechas
  const [filtro, setFiltro] = React.useState(1); // 1: Hoy, 2: semana, 3: último mes, 4: otro
  const [rangoPersonalizado, setRangoPersonalizado] = React.useState([
    null,
    null,
  ]);
  
  const [rangoAplicado, setRangoAplicado] = React.useState([
    dayjs().startOf("day").toDate(),
    dayjs().endOf("day").toDate(),
  ]);

  const handlerFiltroPersonalizado = () => {
    setRangoAplicado([...rangoPersonalizado]);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const tipo = getTipoFromTabIndex(value); 
      const data = await getSolicitudes(tipo, rangoAplicado);
      setSolicitudes(data);
      setSelectedId(null);
      props.onSeleccionar?.(null, null); // limpio selección en el padre
    };
    fetchData();
  }, [value, rangoAplicado]); // ahora depende también del rango

  const handleAnalizar = async (id) => {
    try {
      const prestadorId = props.prestador?._id;
      await axios.patch(`${BACKEND_URL}/solicitudes/${id}`, {
        prestadorId: prestadorId,
        estado: "En analisis",
      });

      // Recargo las solicitudes del TAB ACTUAL con el rango actual
      const tipo = getTipoFromTabIndex(value);
      const data = await getSolicitudes(tipo, rangoAplicado);
      setSolicitudes(data);

      props.onSeleccionar(null, null);
      setSelectedId(null);

      // Mostrar snackbar de éxito
      setTipoSnackbar("success");
      setMensajeSnackbar("Solicitud pasada a 'En análisis' correctamente.");
      setOpenSnackbar(true);
      console.log("PRESTADORQUEANALIZA:", prestadorId)
    } catch (error) {
      console.error("Error al analizar solicitud:", error);

      // Mostrar snackbar de error
      setTipoSnackbar("error");
      setMensajeSnackbar("Error al analizar la solicitud.");
      setOpenSnackbar(true);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const renderSolicitudes = () =>
    solicitudes.map((s) => (
      <BasicCard
        key={s._id}
        nombreSolicitud={
          (s.tipo === "Autorizacion" ? "Autorización" : s.tipo) +
          " - " +
          (s.paciente?.nombre || "Sin paciente")
        }
        descripcion={s.observaciones}
        fecha={
          s.fechaPrestacion
            ? dayjs(s.fechaPrestacion)
                .tz("America/Argentina/Buenos_Aires")
                .format("DD/MM/YYYY HH:mm")
            : "--/--/---- --:--"
        }
        selected={selectedId === s._id}
        onSelect={() => {
          setSelectedId(s._id);
          props.onSeleccionar(s.tipo, s._id);
        }}
        onAnalizar={() => handleAnalizar(s._id)}
      />
    ));
  
    const renderNoHaySolicitud = () => (
    <Stack
      width="100%"
      flex={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ py: 4 }}
    >
      <Box
        sx={{
          display: "flex",
          width: "18%",
          height: "23%",
          backgroundColor: "#F4F5FA",
          borderRadius: "50%",
          border: "solid 1px",
          borderColor: "#2E4CA6",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DescriptionIcon
          sx={{
            width: "2vw",
            height: "10vh",
            color: "#2E4CA6",
          }}
        />
      </Box>

      <Typography variant="h6" color="inherit" sx={{ mt: 2 }}>
        No hay Solicitudes Nuevas
      </Typography>
    </Stack>
  );
  
  
  return (
    <Toolbar
      sx={{
        maxHeight:"90vh",
        bgcolor: "#aec3f3",
        width: "40%",
        margin: 2,
        borderRadius: 4,
        alignItems: "start",
      }}
    >
      <Stack
        direction="column"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        {/* Tabs */}
        <AppBar position="absolute" sx={{ bgcolor: "#2E4CA6" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs"
            centered
          >
            <Tab label="General" />
            <Tab label="Reintegros" />
            <Tab label="Autorizaciones" />
            <Tab label="Recetas" />
          </Tabs>
        </AppBar>

        {/* Filtro por fechas */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            mt: 8,
            mb: 1,
            gap: 2,
          }}
        >
          <Select
            value={filtro}
            sx={{
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              minWidth: 140,
              bgcolor: "white",
              borderRadius: 2,
            }}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <MenuItem
              value={1}
              onClick={() =>
                setRangoAplicado([
                  dayjs().startOf("day").toDate(),
                  dayjs().endOf("day").toDate(),
                ])
              }
            >
              Hoy
            </MenuItem>
            <MenuItem
              value={2}
              onClick={() =>
                setRangoAplicado([
                  dayjs().startOf("week").toDate(),
                  dayjs().endOf("week").toDate(),
                ])
              }
            >
              Esta semana
            </MenuItem>
            <MenuItem
              value={3}
              onClick={() =>
                setRangoAplicado([
                  dayjs().subtract(1, "month").startOf("month").toDate(),
                  dayjs().subtract(1, "month").endOf("month").toDate(),
                ])
              }
            >
              Último mes
            </MenuItem>
            <MenuItem value={4}>Otro</MenuItem>
          </Select>

          {filtro === 4 && (
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <DatePicker
                  label="Desde"
                  value={rangoPersonalizado[0]}
                  onChange={(newValue) =>
                    setRangoPersonalizado([newValue, rangoPersonalizado[1]])
                  }
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                  inputFormat="dd/MM/yyyy"
                  sx={{ width: 150 }}
                />
                <DatePicker
                  label="Hasta"
                  value={rangoPersonalizado[1]}
                  onChange={(newValue) =>
                    setRangoPersonalizado([rangoPersonalizado[0], newValue])
                  }
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                  inputFormat="dd/MM/yyyy"
                  sx={{ width: 150 }}
                />
                <Button
                  onClick={handlerFiltroPersonalizado}
                  variant="contained"
                  color="primary"
                  sx={{ width: 80, height: 40 }}
                >
                  Aplicar
                </Button>
              </Box>
            </LocalizationProvider>
          )}
        </Box>

        {/* Listado según tab + rango */}
        <Stack
          direction="column"
          sx={{
            width: "100%",
            flex: 1,
            maxHeight: "74vh",
            overflowY: "auto",
          }}
        >
          {/* General: todas las pendientes en rango */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            {solicitudes.length > 0
              ? renderSolicitudes()
              : renderNoHaySolicitud()}
          </TabPanel>

          {/* Reintegros pendientes en rango */}
          <TabPanel value={value} index={1} dir={theme.direction}>
            {solicitudes.length > 0
              ? renderSolicitudes()
              : renderNoHaySolicitud()}
          </TabPanel>

          {/* Autorizaciones pendientes en rango */}
          <TabPanel value={value} index={2} dir={theme.direction}>
            {solicitudes.length > 0
              ? renderSolicitudes()
              : renderNoHaySolicitud()}
          </TabPanel>

          {/* Recetas pendientes en rango */}
          <TabPanel value={value} index={3} dir={theme.direction}>
            {solicitudes.length > 0
              ? renderSolicitudes()
              : renderNoHaySolicitud()}
          </TabPanel>
        </Stack>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={tipoSnackbar}
            sx={{ width: "100%" }}
          >
            {mensajeSnackbar}
          </Alert>
        </Snackbar>
      </Stack>
    </Toolbar>
  );
}
