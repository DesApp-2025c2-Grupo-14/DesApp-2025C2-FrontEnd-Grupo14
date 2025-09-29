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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={
        {
          flexGrow:0,
          height: 'inherit',
          width: '100%',
          overflow: 'auto'
        }
      }
      direction='column'
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      
    >
      {value === index && (
        <Box sx={{width: '100%',}}>
          {children}
        </Box>
      )}
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

export function Listado() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  /*const solicitudes = */
  const [solicitudes, setSolicitudes] = React.useState ([
    {
      id: 1,
      tipo: "Reintegro",
      nombre: "Reintegro - Juan Pérez",
      descripcion:
        "Solicita el reintegro de los gastos médicos correspondientes a consultas y análisis realizados durante el mes de agosto, incluyendo facturas de laboratorio y comprobantes de pago de medicamentos prescritos por su médico de cabecera.",
      fecha: "2025-09-12",
    },
    {
      id: 2,
      tipo: "Autorizacion",
      nombre: "Autorización - María Gómez",
      descripcion:
        "Solicita autorización para iniciar un tratamiento de fisioterapia especializado tras una lesión en la columna vertebral, que requiere sesiones semanales por un periodo mínimo de tres meses para asegurar la correcta recuperación y prevención de futuras complicaciones.",
      fecha: "2025-08-28",
    },
    {
      id: 3,
      tipo: "Receta",
      nombre: "Receta - Carlos Martínez",
      descripcion:
        "Solicita receta médica para la medicación crónica prescrita por su cardiólogo, incluyendo dosis y frecuencia detallada, necesaria para el control de su presión arterial y prevención de complicaciones cardiovasculares.",
      fecha: "2025-09-05",
    },
    {
      id: 4,
      tipo: "Reintegro",
      nombre: "Reintegro - Ana Torres",
      descripcion:
        "Solicita reintegro por la realización de análisis de laboratorio especializados que fueron solicitados como parte de un control médico rutinario, adjuntando todos los comprobantes y facturas correspondientes.",
      fecha: "2025-09-01",
    },
    {
      id: 5,
      tipo: "Autorizacion",
      nombre: "Autorización - Luis Fernández",
      descripcion:
        "Requiere autorización para la realización de un examen especializado de cardiología, el cual es necesario debido a antecedentes familiares y síntomas recientes que podrían indicar problemas cardíacos.",
      fecha: "2025-08-30",
    },
    {
      id: 6,
      tipo: "Receta",
      nombre: "Receta - Patricia López",
      descripcion:
        "Solicita receta para antibióticos de uso prolongado indicados por su especialista en infectología, con instrucciones detalladas sobre la dosis diaria y el periodo total del tratamiento para asegurar la eficacia y evitar resistencia bacteriana.",
      fecha: "2025-09-10",
    },
    {
      id: 7,
      tipo: "Reintegro",
      nombre: "Reintegro - Diego Ramírez",
      descripcion:
        "Solicita reintegro de la compra de lentes oftálmicos recetados, incluyendo montura y cristales con tratamiento antirreflejo, necesarios para su trabajo diario frente a pantallas de computadora durante largas horas.",
      fecha: "2025-09-03",
    },
    {
      id: 8,
      tipo: "Autorizacion",
      nombre: "Autorización - Gabriela Sánchez",
      descripcion:
        "Solicita autorización para una cirugía menor de rodilla, recomendada por su traumatólogo tras evaluación de molestias persistentes, con el objetivo de mejorar movilidad y prevenir lesiones mayores en el futuro.",
      fecha: "2025-08-25",
    },
    {
      id: 9,
      tipo: "Receta",
      nombre: "Receta - Andrés Castillo",
      descripcion:
        "Solicitud de receta para medicación hipertensiva prescrita por su médico internista, incluyendo dosis y horarios de administración, necesaria para mantener la presión arterial dentro de los rangos recomendados y evitar complicaciones graves.",
      fecha: "2025-09-15",
    },
    {
      id: 10,
      tipo: "Reintegro",
      nombre: "Reintegro - Carolina Díaz",
      descripcion:
        "Solicita reintegro de los gastos de atención odontológica, incluyendo limpieza profesional y tratamiento de caries menores, adjuntando las facturas y comprobantes de pago para el reembolso correspondiente.",
      fecha: "2025-09-08",
    },
  ])
  const handleAnalizar = (id) => {
    // Filtra la lista quitando el elemento seleccionado
    setSolicitudes(solicitudes.filter((item) => item.id !== id));
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [selectedId, setSelectedId] = React.useState(null);
  const renderSolicitudesPorTipo = (tipo) => {
    return solicitudes
      .filter((s) => s.tipo === tipo)
      .map((s) => (
        <BasicCard
          key={s.id}
          nombreSolicitud={s.nombre}
          descripcion={s.descripcion}
          fecha={s.fecha}
          selected={selectedId === s.id}
          onSelect={(id) => setSelectedId(s.id)}
          onAnalizar = {()=>handleAnalizar(s.id)}
        />
      ));
  };

  return (
    <Toolbar
      sx={{
        bgcolor:'#F9F9FF',
        overflow: 'auto',
        width:'50%',
        margin: 2,
        borderRadius: 3
      }} 
    > 
      <Stack direction='column' justifyContent='space-between' sx={{}}>
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

        <Stack direction='row' sx={{ flex: 1,maxHeight: '80vh', overflowY: "auto"}}>
          <TabPanel value={value} index={0} dir={theme.direction}>
            {solicitudes.map((p) => (
              <BasicCard
                key={p.id}
                nombreSolicitud={p.nombre}
                descripcion={p.descripcion}
                fecha={p.fecha}
                selected={selectedId === p.id}
                onSelect={() => setSelectedId(p.id)}
                onAnalizar = {()=>handleAnalizar(p.id)}
              />
            ))}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {renderSolicitudesPorTipo("Reintegro")}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            {renderSolicitudesPorTipo("Autorizacion")}
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            {renderSolicitudesPorTipo("Receta")}
          </TabPanel>
        </Stack>
      </Stack>
    </Toolbar>
  );
}
