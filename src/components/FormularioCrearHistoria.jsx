import React, { useState } from "react";
import {Card, CardContent, Typography, TextField, Button, Box, Stack} from "@mui/material";
import dayjs from "dayjs";
import 'dayjs/locale/es';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
dayjs.locale("es");

export default function FormularioCrearHistoria({ onGuardar , cerrar, prestador }) {
  const [titulo, setTitulo] = useState("");
  const [nota, setNota] = useState("");
  const [error, setError] = useState({});

  
  const handleSubmit = () => {
    // acumulador de errores
    console.log("Prestador recibido en el formulario:", prestador);
    const nuevosErrores = {};
    // validaciones
    if (!titulo.trim()) nuevosErrores.titulo = "El título es obligatorio";
    if (!nota.trim()) nuevosErrores.nota = "La nota es obligatoria";
    setError(nuevosErrores);
    // si hay errores no sigo
    if (Object.keys(nuevosErrores).length > 0) return;
    const nuevaHistoria ={
      titulo,
      prestadorId: prestador._id,
      prestador: prestador.nombre,
      notas :nota ,
    }
    onGuardar(nuevaHistoria)
    cerrar()
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
          Crear Historia Clinica
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
          <TextField
            label="nota"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            error={!!error.nota}
            helperText={error.nota}
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
            Guardar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
