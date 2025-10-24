import React, { useState } from "react";
import {Card,CardContent,Typography,TextField,Button,Box,Stack,Alert,} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

export default function FormularioCrearSituacion({ onGuardar, onCancelar, nroAfiliado }) {
  const [titulo, setTitulo] = useState("");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);
  const [descripcion, setdescripcion] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // ✅ nuevo estado para errores
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // ✅ Validación visual (sin alertas)
    if (!titulo || !fechaInicio || !descripcion) {
      setErrorMessage("Por favor completá todos los campos obligatorios.");
      return;
    }

    setErrorMessage(""); // limpio error previo
    setLoading(true);

    try {
      // armo el objeto para enviar
      const nuevaSituacion = {
        titulo,
        fechaInicio: fechaInicio.toISOString(),
        fechaFinal: fechaFinal ? fechaFinal.toISOString() : null,
        descripcion,
      };

      // ✅ envío al backend
      const response = await axios.post(
        `http://localhost:3000/pacientes/${nroAfiliado}/crearSituacion`,
        nuevaSituacion
      );

      // notifico al componente padre
      onGuardar(response.data.situacion);
    } catch (error) {
      console.error("Error al crear la situación:", error);
      setErrorMessage("Hubo un error al crear la situación terapéutica.");
    } finally {
      setLoading(false);
    }
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

        {/* ✅ mensaje visual de error */}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Stack spacing={2}>
          <TextField
            label="Título"
            variant="outlined"
            fullWidth
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            error={!titulo && !!errorMessage}
            helperText={!titulo && !!errorMessage ? "Campo obligatorio" : ""}
            sx={{ backgroundColor: "#ffffff", borderRadius: "6px" }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha Inicio"
              value={fechaInicio}
              onChange={(newValue) => setFechaInicio(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !fechaInicio && !!errorMessage,
                  helperText:
                    !fechaInicio && !!errorMessage ? "Campo obligatorio" : "",
                  sx: { backgroundColor: "#ffffff", borderRadius: "6px" },
                },
              }}
            />
            <DatePicker
              label="Fecha Final"
              value={fechaFinal}
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
            label="Descripción"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={descripcion}
            onChange={(e) => setdescripcion(e.target.value)}
            error={!descripcion && !!errorMessage}
            helperText={
              !descripcion && !!errorMessage ? "Campo obligatorio" : ""
            }
            sx={{ backgroundColor: "#ffffff", borderRadius: "6px" }}
          />
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
          <Button
            variant="contained"
            disabled={loading}
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
            onClick={handleSubmit}
          >
            {loading ? "Guardando..." : "Dar de alta"}
          </Button>

          <Button
            variant="outlined"
            onClick={onCancelar}
            sx={{ textTransform: "none" }}
          >
            Cancelar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
