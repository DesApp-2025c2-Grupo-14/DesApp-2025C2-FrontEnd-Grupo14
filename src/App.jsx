import React, { useEffect, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { TopMenu } from "./components/TopMenu";
import { AppRouter } from "./AppRouter";
import { getCurrentWeather } from "./services/WeatherService";
import { WeatherIndicator } from "./components/WeatherIndicator";
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { fill } from "lodash";
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
      <Stack 
        direction='row' 
        height='100%' 
        width='100%'
        spacing= 'auto'>
        <Box 
          width='13vw'
          sx={{
            
            // px: { xs: 2, sm: 4, lm: 6},
            py: 4,
            bgcolor: '#021F59'
            // minWidth: '4vh',
            // minHeight: '100%',
          }} 
        >
          <Menu />
        </Box>
        {/* <Stack item xs={12} md={8} direction='row' width='100%' padding= '10px' height='10vh'>
          <Header seccion='Bandeja de entrada' usuario='Ariel Nuñez' />
        </Stack> */}
        
      </Stack>
    </BrowserRouter>      
  )
}
