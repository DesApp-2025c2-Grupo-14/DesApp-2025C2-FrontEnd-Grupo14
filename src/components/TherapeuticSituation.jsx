import { Box, Typography, Paper, Stack, Button } from "@mui/material";
import { useState } from "react";
import FormularioSituacionTerapeutica from "./NewTherapeuticSituation";

export default function SituacionTerap({ patient }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const historial = [
    { motivo: "Embarazo", fechaI: "02/03/25", fechaF: "--/-/--" },
    { motivo: "Conflicto de pareja", fechaI: "02/08/25", fechaF: "17/08/25" },
    { motivo: "Estrés laboral o burnout", fechaI: "03/06/25", fechaF: "02/08/25" },
    { motivo: "Crisis vital o Existencia", fechaI: "02/08/25", fechaF: "12/11/25" },
    { motivo: "Crisis de los 30", fechaI: "02/08/25", fechaF: "12/11/25" },
    { motivo: "Crisis de los 35", fechaI: "02/08/25", fechaF: "12/11/25" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#464444",
        p: 3,
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#d3d5d8",
          mb: 3,
          fontSize: "1.2rem",
        }}
      >
        Situaciones Terapéuticas Actuales — {patient?.name || "Paciente"}
      </Typography>

      {/* Contenedor scrollable solo para el historial */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          pr: 1,
        }}
      >
        <Stack spacing={2}>
          {historial.map((item, idx) => (
            <Paper
              key={idx}
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: "#ffffffdc",
                border: "1px solid #dcdcdc",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, fontSize: "1rem", color: "#333333" }}
              >
                {item.motivo}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666666", fontSize: "1rem" }}>
                Fecha Inicio: {item.fechaI}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666666", fontSize: "1rem" }}>
                Fecha Fin: {item.fechaF}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* Botón debajo del historial, fuera del scroll */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          onClick={() => setMostrarFormulario(true)}
          sx={{
            width: "40%",
            py: 1.5,
            textTransform: "none",
            backgroundColor: "#4266d3",
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: "8px",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#cc7340" },
          }}
        >
          Nueva situación
        </Button>
      </Box>

      {/* Modal del formulario */}
      {mostrarFormulario && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 600 }}>
            <FormularioSituacionTerapeutica />
            <Button
              variant="outlined"
              onClick={() => setMostrarFormulario(false)}
              sx={{ mt: 2, width: "100%" }}
            >
              Cerrar
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}


