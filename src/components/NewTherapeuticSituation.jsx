import React from "react";
import {Card, CardContent, Typography, TextField, Button, Box } from "@mui/material";

export default function FormularioSituacionTerapeutica() {
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
