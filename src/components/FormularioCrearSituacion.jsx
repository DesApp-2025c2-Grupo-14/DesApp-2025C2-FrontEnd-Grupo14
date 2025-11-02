import React, { useState } from "react";
import {Card, CardContent, Typography, TextField, Button, Box, Stack} from "@mui/material";
import dayjs from "dayjs";
import 'dayjs/locale/es';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
dayjs.locale("es");

export default function FormularioCrearSituacion({ onGuardar }) {
  const [titulo, setTitulo] = useState("");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);
  const [descripcion, setdescripcion] = useState("");
  const [error, setError] = useState({});

  const handleSubmit = () => {
    // acumulador de errores
    const nuevosErrores = {};
    // validaciones
    if (!titulo.trim()) nuevosErrores.titulo = "El título es obligatorio";
    if (!fechaInicio) nuevosErrores.fechaInicio = "La fecha de inicio es obligatoria";
    if (!descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria";
    setError(nuevosErrores);
    // si hay errores no sigo
    if (Object.keys(nuevosErrores).length > 0) return;
      // formateo las fechas a formato estandar para mandarlas al back ademas de setear la hora a las 00 para evitar problemas de zona horaria
      const fechaInicioFormateada = dayjs(fechaInicio).startOf('day').format('YYYY-MM-DD');
      const fechaFinalFormateada = fechaFinal ? dayjs(fechaFinal).startOf('day').format('YYYY-MM-DD') : null;
      // creo la nueva situacion para luego mandarla a situacionterap
        const nuevaSituacion ={
          titulo,
          fechaInicio: fechaInicioFormateada,
          fechaFinal: fechaFinalFormateada,
          descripcion
        }
        onGuardar(nuevaSituacion)
  };
  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "0 auto",
        backgroundColor: "#e0e0e0",
        borderRadius: "12px",
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          align="center"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Formulario de situación terapéutica
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Título"
            variant="outlined"
            fullWidth
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            error={!!error.titulo}
            helperText={error.titulo}
            sx={{ backgroundColor: "#ffffff", borderRadius: "6px" }}
          />
          {/* el adapterlocale es para cambiar el idioma del calendario */}
          <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale="es">
            <DatePicker
              label="Fecha Inicio"
              value={fechaInicio}
              format="DD/MM/YYYY"
              onChange={(newValue) => setFechaInicio(newValue)}
              slotProps={{ // cambio a slotProps en lugar de renderInput porque esta deprecado
                textField: {
                  fullWidth: true,
                  error: !!error.fechaInicio,
                  helperText: error.fechaInicio,
                  sx: { backgroundColor: "#ffffff", borderRadius: "6px" },
                },
              }}
            />
            <DatePicker
              label="Fecha Final"
              format="DD/MM/YYYY"
              value={fechaFinal}
              minDate={fechaInicio ? dayjs(fechaInicio) : undefined}
              onChange={(newValue) => setFechaFinal(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: { backgroundColor: "#ffffff", borderRadius: "6px" },
                },
              }}
            />
          </LocalizationProvider>

          <TextField
            label="descripcion"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={descripcion}
            onChange={(e) => setdescripcion(e.target.value)}
            error={!!error.descripcion}
            helperText={error.descripcion}
            sx={{ backgroundColor: "#ffffff", borderRadius: "6px" }}
          />
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              px: 4,
              "&:hover": {
                backgroundColor: "#125a9c",
              },
            }}
            onClick={() => {
              handleSubmit();
            }}
          >
            Dar de alta
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
