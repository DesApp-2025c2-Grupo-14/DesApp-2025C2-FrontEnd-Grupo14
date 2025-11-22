import React, { useState } from "react";
import {Card, CardContent, Typography, TextField, Button, Box, Stack} from "@mui/material";
import { BotonCrearHistoria } from "./BotonCrearHistoria";
import dayjs from "dayjs";
import 'dayjs/locale/es';
dayjs.locale("es");

export default function FormularioCrearHistoria({ onGuardar , cerrar }) {
  const [titulo, setTitulo] = useState("");
  const [nota, setNota] = useState("");
  const [error, setError] = useState({});

  const handleSubmit = () => {
    // acumulador de errores
    const nuevosErrores = {};
    // validaciones
    if (!titulo.trim()) nuevosErrores.titulo = "El título es obligatorio";
    if (!nota.trim()) nuevosErrores.nota = "La nota es obligatoria";
    setError(nuevosErrores);
    // si hay errores no sigo
    if (Object.keys(nuevosErrores).length > 0) return;
    const nuevaHistoria ={
      titulo,
      prestador: "Dra. Martínez",
      notas :nota ,
    }
    onGuardar(nuevaHistoria)
    cerrar()
  };
  return (
    <Card
      sx={{
        width:"100%",
        backgroundColor: "#e0e0e0",
        borderRadius: "12px"
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
          <BotonCrearHistoria onGuardar={handleSubmit} />
        </Box>
      </CardContent>
    </Card>
  );
}
