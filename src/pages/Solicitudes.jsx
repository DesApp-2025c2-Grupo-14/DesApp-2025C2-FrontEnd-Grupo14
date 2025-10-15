import { Box, Stack } from "@mui/material";
import { Header } from '../components/Header';
import PropTypes from 'prop-types';
import Tab from "@mui/material/Tab";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TablaPaginacion from "../components/TablaPaginacion";
import * as React from "react";

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
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return(
    <Stack direction='column' width='100%' height='100%' bgcolor='#F2F2F2' >
      <Header seccion='Pacientes' usuario='Ariel Nuñez' />
      <Box>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                <Tab label="Reintegros" value="1" />
                <Tab label="Autorizaciones" value="2" />
                <Tab label="Recetas" value="3" />
             </TabList>
           </Box>

            <TabPanel value="1">
              <Stack border={"solid"} height= "100%" width={"100%"}>
                <TablaPaginacion/>
              </Stack>
            </TabPanel>

            <TabPanel value="2">
              <Stack border={"solid yellow"}>
                <TablaPaginacion/>
              </Stack>
            </TabPanel>

            <TabPanel value="3">
              <Stack border={"double"}>
                <TablaPaginacion/>
              </Stack>
            </TabPanel>

          </TabContext>
       </Box>
      </Box>


    </Stack>
  );
}