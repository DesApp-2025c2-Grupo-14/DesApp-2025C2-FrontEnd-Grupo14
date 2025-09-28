import React, { useEffect, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { BrowserRouter, Outlet } from "react-router-dom";
import { TopMenu } from "./components/TopMenu";
import { AppRouter } from "./AppRouter";
import { getCurrentWeather } from "./services/WeatherService";
import { WeatherIndicator } from "./components/WeatherIndicator";
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { fill } from "lodash";
import { DatosProvider  } from "./context/datos";
import { BuscadorPacientes } from "./components/BuscadorPacientes";
import { InfoContainer } from "./components/InfoContainer";
import { red } from "@mui/material/colors";
import { HistoriaClinica } from './components/HistoriaClinica';
export function App() {
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    const fetchWeatherData = async () => {
      const obtainedData = await getCurrentWeather('Buenos Aires');
      setWeatherData(obtainedData);
    }
    fetchWeatherData();
  }, []);

  return (
      <BrowserRouter>
        <AppRouter />
        <Stack direction='row'height='100vh' width='100vw' spacing={2} sx={{bgcolor: 'rgba(252, 226, 178, 1)'}} >
          <Box 
            maxWidth='100%'
            sx={{

              // px: { xs: 2, sm: 4, lm: 6},
              py: 4,
              bgcolor: '#021F59',
              // minWidth: '4vh',
              //minHeight: '100%',
            }} 
          >
            <Menu />
          </Box>
          <Stack direction='column' width='100%' height='100%' paddingLeft={2} bgcolor='#FCE2B2' spacing={2}>
            <Stack direction='row' width='100%' paddingTop={2}>
              <Header seccion='Bandeja de entrada' usuario='Ariel Nuñez' />
            </Stack>
            <Stack direction= 'row' spacing={4} height= '90%' >
              <DatosProvider>
                <Stack width='50%' padding= '30px'  sx={{bgcolor: 'rgba(255, 255, 255, 1)',borderRadius: 3,border :'2px solid'}}>
                  <BuscadorPacientes />
                </Stack> 
                <Stack width='100%'paddingLeft= '10px' sx={{bgcolor: 'rgba(253, 252, 250, 1)',borderRadius: 3,border :'2px solid'}}>
                  <InfoContainer /> 
                </Stack> 
              </DatosProvider>
            </Stack>
          </Stack>
        </Stack>
      </BrowserRouter>
  )
}
