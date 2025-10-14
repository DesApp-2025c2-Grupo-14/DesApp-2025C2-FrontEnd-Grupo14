import React, { useState } from "react";
import {Card, CardContent, Typography, TextField, Button, Box, Stack } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";

export default function FormularioCrearSituacion({ onGuardar, onCancelar, nroAfiliado }) {
  const [titulo, setTitulo] = useState("");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);
  const [descripcion, setdescripcion] = useState("");

  const handleSubmit = () => {
    if (!titulo || !fechaInicio || !descripcion) {
      alert("Por favor completa los campos obligatorios");
      return;
    }
    // creo la nueva situacion para luego mandarla a situacionterap
      const nuevaSituacion ={
        titulo,
        fechaInicio,
        fechaFinal,
        descripcion
      }
      onGuardar(nuevaSituacion)
/*     const nuevaSituacion = {
      id: Date.now(),
      titulo,
      fechaInicio: fechaInicio.format("DD/MM/YY"),  
      fechaFinal: fechaFinal ? fechaFinal.format("DD/MM/YY") : "",
      nroAfiliado,
      descripcion
    }; */
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
            sx={{ backgroundColor: "#ffffff", borderRadius: "6px" }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha Inicio"
              value={fechaInicio}
              onChange={(newValue) => setFechaInicio(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  sx={{ backgroundColor: "#ffffff", borderRadius: "6px" }}
                />
              )}
            />
            <DatePicker
              label="Fecha Final"
              value={fechaFinal}
              onChange={(newValue) => setFechaFinal(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  sx={{ backgroundColor: "#ffffff", borderRadius: "6px" }}
                />
              )}
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
