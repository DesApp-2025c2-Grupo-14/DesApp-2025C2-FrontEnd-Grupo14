import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { BasicCard } from "./Card";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const BACKEND_URL = "http://localhost:3000";
dayjs.extend(utc);
dayjs.extend(timezone);
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{
        // flexGrow:0,
        height: "inherit",
        width: "100%",
        overflow: "auto",
      }}
      direction="column"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && <Box sx={{ width: "100%" }}>{children}</Box>}
    </Box>
    // {value === index && (
    //     <Box sx={{height: '10%'}}>
    //       {children}
    //     </Box>
    //   )}
  );
}

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
async function getSolicitudes() {
  try {
    const response = await axios.get(`${BACKEND_URL}/solicitudes`);
    console.log("✅ Solicitudes obtenidas del backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al traer solicitudes:", error);
    return [];
  }
}

export function Listado(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [solicitudes, setSolicitudes] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(null);
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/solicitudes/prestador")
      .then(({ data }) => setPrestadorActual(data.id))
      .catch((error) => console.error("Error al obtener prestadorId:", error));
  }, []);
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getSolicitudes();
      setSolicitudes(data);
    };
    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const renderSolicitudesPorTipo = (tipo) =>
    solicitudes
      .filter((s) => s.tipo === tipo)
      .map((s) => (
        <BasicCard
          key={s._id}
          nombreSolicitud={
            (s.tipo === "Autorizacion" ? "Autorización" : s.tipo) +
            " - " +
            (s.nombre || "Paciente no encontrado")
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
          onAnalizar={() => console.log("Analizar solicitud", s._id)}
        />
      ));

  return (
    <Toolbar
      sx={{
        bgcolor: "#aec3f3",
        overflow: "auto",
        width: "40%",
        margin: 2,
        borderRadius: 3,
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <AppBar position="absolute" sx={{ bgcolor: "#2E4CA6" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            centered
          >
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="Reintegros" {...a11yProps(1)} />
            <Tab label="Autorizaciones" {...a11yProps(2)} />
            <Tab label="Recetas" {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        <Stack
          direction="row"
          sx={{
            width: "100%",
            flex: 1,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {/* 🔹 Pestaña: Todas */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            {solicitudes.length > 0 ? (
              solicitudes.map((p) => (
                <BasicCard
                  key={p._id}
                  nombreSolicitud={
                    (p.tipo === "Autorizacion" ? "Autorización" : p.tipo) +
                    " - " +
                    (p.pacienteId?.nombre || "Sin paciente")
                  }
                  descripcion={p.observaciones}
                  fecha={
                    p.fechaPrestacion
                      ? dayjs(p.fechaPrestacion)
                          .tz("America/Argentina/Buenos_Aires")
                          .format("DD/MM/YYYY HH:mm")
                      : "--/--/---- --:--"
                  }
                  selected={selectedId === p._id}
                  onSelect={() => {
                    setSelectedId(p._id);
                    props.onSeleccionar(p.tipo, p._id);
                  }}
                  onAnalizar={() => console.log("Analizar solicitud", p._id)}
                />
              ))
            ) : (
              <p>No hay solicitudes para mostrar.</p>
            )}
          </TabPanel>

          {/* 🔹 Pestaña: Reintegros */}
          <TabPanel value={value} index={1} dir={theme.direction}>
            {renderSolicitudesPorTipo("Reintegro")}
          </TabPanel>

          {/* 🔹 Pestaña: Autorizaciones */}
          <TabPanel value={value} index={2} dir={theme.direction}>
            {renderSolicitudesPorTipo("Autorizacion")}
          </TabPanel>

          {/* 🔹 Pestaña: Recetas */}
          <TabPanel value={value} index={3} dir={theme.direction}>
            {renderSolicitudesPorTipo("Receta")}
          </TabPanel>
        </Stack>
      </Stack>
    </Toolbar>
  );
}


