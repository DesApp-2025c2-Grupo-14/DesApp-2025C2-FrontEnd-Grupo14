import { Box, Stack } from "@mui/material";
import { Header } from "../components/Header";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import * as React from "react";
import TabDash from "../components/TabDash";
import axios from "axios";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export function Solicitudes() {
  const [value, setValue] = React.useState("1");
  const [prestadorId, setPrestadorId] = React.useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/solicitudes/prestador")
      .then(({ data }) => setPrestadorId(data.id))
      .catch((error) =>
        console.error("Error al obtener prestadorId:", error)
      );
  }, []);

  return (
    <Stack direction="column" width="100%" height="100%" bgcolor="#F2F2F2">
      <Header seccion="Pacientes" usuario="Ariel Nuñez" />
      <Box>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                centered
              >
                <Tab label="Reintegros" value="1" />
                <Tab label="Autorizaciones" value="2" />
                <Tab label="Recetas" value="3" />
              </TabList>
            </Box>

            <TabPanel
              value="1"
              sx={{
                p: 0,
                height: "calc(100vh - 180px)", // ajustá según alto de tu header/tabs
                paddingRight: 7,
              }}
            >
              <TabDash
                prestadorId={prestadorId}
                tipo="Reintegro"
              />
            </TabPanel>

            <TabPanel
              value="2"
              sx={{
                p: 0,
                height: "calc(100vh - 180px)", // ajustá según alto de tu header/tabs
                paddingRight: 7,
              }}
            >
              <TabDash
                prestadorId={prestadorId}
                tipo="Autorizacion"
              />
            </TabPanel>

            <TabPanel
              value="3"
              sx={{
                p: 0,
                height: "calc(100vh - 180px)", // ajustá según alto de tu header/tabs
                paddingRight: 7,
              }}
            >
              <TabDash
                prestadorId={prestadorId}
                tipo="Receta"
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Stack>
  );
}
