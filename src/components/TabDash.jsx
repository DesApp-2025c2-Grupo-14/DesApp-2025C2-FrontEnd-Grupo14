// src/components/TabDash.jsx
import * as React from "react";
import { Box, Stack,Select, MenuItem, Button } from "@mui/material";
import { es } from "date-fns/locale";
import TablaPaginacion from "./TablaPaginacion";
import Dashboard from "./Dashboard";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import dayjs from "dayjs"
export default function TabDash({ prestadorId, tipo, centroMedico, filtro, rango, rangoPersonalizado, onChangeFiltro, onChangeRango, onChangeRangoPersonalizado }) {
    
    // const [prestadorId, setPrestadorId] = React.useState(propPrestadorId || null);
    const [seleccion, setSeleccion] = React.useState(null);
    const [actualizar, setActualizar] = React.useState(false);

    const handlerFiltro = () => {
        onChangeRango([...rangoPersonalizado]);
      };

      return (
        <Stack
          direction="column"
          sx={{
              width: "100%",
              height: "100%",

              // px: 2,
              // py: 2,
            }}
        >
          <Box sx={{ display: "flex",  alignItems: "center"}}>
              <Select
                value={filtro}
                sx={{
                  ".MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
                onChange={(e) => onChangeFiltro(e.target.value)}
              >
                <MenuItem value={1} onClick={() => {
                  onChangeRango([dayjs().startOf('day').toDate(),dayjs().endOf('day').toDate()]) 
                  onChangeRangoPersonalizado([null,null])
                }} >Hoy</MenuItem>
                <MenuItem value={2} onClick={() => {
                  onChangeRango([dayjs().startOf('week').toDate(),dayjs().endOf('week').toDate()])
                  onChangeRangoPersonalizado([null,null])
                }}>Esta semana</MenuItem>
                <MenuItem value={3} onClick={() => {
                  onChangeRango([dayjs().subtract(1, 'month').startOf('month').toDate(),dayjs().subtract(1, 'month').endOf('month').toDate()])
                  onChangeRangoPersonalizado([null,null])
                }}>Último mes</MenuItem>
                <MenuItem value={4}>Otro</MenuItem>
              </Select>
              {filtro === 4 && (
                <Box
                  sx={{ display: "flex", gap: 2, py: 2, alignItems:"center"}}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                    <DatePicker
                      label="Desde"
                      value={rangoPersonalizado[0]}
                      onChange={(newValue) => onChangeRangoPersonalizado([newValue, rangoPersonalizado[1]])}
                      renderInput={(params) => <TextField {...params} />}
                      inputFormat="dd/MM/yyyy"
                      sx={{width: 150}}
                      // sx={
                      //   {
                      //     bgcolor: '#021F59',
                      //   }
                      // }
                    />
                    <DatePicker
                      label="Hasta"
                      value={rangoPersonalizado[1]}
                      onChange={(newValue) => onChangeRangoPersonalizado([rangoPersonalizado[0], newValue])}
                      renderInput={(params) => <TextField {...params} />}
                      inputFormat="dd/MM/yyyy"
                      sx={{width: 150}}
                    />
                    <Button onClick={handlerFiltro} variant="contained" color="primary" sx={{width: 80, height: 40}}>
                      Aplicar
                    </Button>
                  </LocalizationProvider>
                </Box>
              )}
            </Box>
        
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{
              width: "100%",
              height: "100%",
              alignItems: "stretch",
              gap: 2,
              // px: 2,
              // py: 2,
            }}
          >
            
            <Box
              sx={{
                flex: { xs: "1 1 auto", md: "0 0 70%" },
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
                maxHeight: '100%'
              }}
            >
              
              <Box sx={{ flex: 1, minHeight: 0, height: "inherit", overflow: "hidden" }}>
                {prestadorId ?(<TablaPaginacion
                  prestadorId={prestadorId}
                  centroMedico={centroMedico}
                  tipo={tipo}
                  onSelectSolicitud={setSeleccion}
                  onUpdate={() => setActualizar((prev) => !prev)} // Recarga de pagina
                  rangoAplicado={rango}
                />) : (
                      <Box sx={{ p: 3, textAlign: "center" }}>Cargando prestador...</Box>
                    )}
              </Box>
            </Box>
            <Box
              sx={{
                flex: { xs: "1 1 100%", md: "0 0 %30" }, // ← ancho fijo en desktop, full ancho en móvil
                minWidth: { xs: "100%", md: 360 },
                // maxWidth: { md: 400 }, // opcional: límite máximo de ancho
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
                height: '100%',
                borderRadius: 4,
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#fff",
                overflow: "hidden", // evita que el contenido se desborde
              }}
            >
              {prestadorId ? (
                <Dashboard
                    prestadorId={prestadorId}
                    centroMedico={centroMedico}
                    tipo={tipo}
                    showLegend={true}
                    chartWidth={320}
                    chartHeight={420}
                    cardHeight={100}
                    actualizar={actualizar}
                    rangoAplicado={rango}
                  />
                    ) : (
                      <Box sx={{ p: 3, textAlign: "center" }}>Cargando prestador...</Box>
                    )
              }
            </Box>
          </Stack>
        </Stack>
      );
  }

