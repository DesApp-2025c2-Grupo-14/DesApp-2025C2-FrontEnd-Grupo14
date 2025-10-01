import React, { useState } from "react";
import {Card, CardContent, Typography, TextField, Button, Box } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function FormularioSituacionTerapeutica() {
  const [fecha, setFecha] = useState(dayjs());
  
  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "0 auto",
        backgroundColor: "#e0e0e0", // gris de fondo
        borderRadius: "12px",
        boxShadow: 3,
      }}
    >
      <CardContent>
        {/* Título */}
        <Typography
          variant="h6"
          align="center"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Formulario de situación terapéutica
        </Typography>

        {/* Inputs */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Título"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: "#ffffff", borderRadius: "6px" }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de inicio"
              value={fecha}
              onChange={(newValue) => setFecha(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  sx={{ backgroundColor: "#ffffff", borderRadius: "6px" }}
                />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha final"
              value={fecha}
              onChange={(newValue) => setFecha(newValue)}
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
            label="Descripción"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            sx={{ backgroundColor: "#ffffff", borderRadius: "6px" }}
          />
        </Box>

        {/* Botón */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976d2", // azul
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              px: 4,
              "&:hover": {
                backgroundColor: "#125a9c",
              },
            }}
          >
            Dar de alta
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
