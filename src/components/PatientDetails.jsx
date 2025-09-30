import { Box, Typography, Grid, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import HistorialMedico from "./MedicalHistoryDetails";
import SituacionTerap from "./TherapeuticSituation"; 
import FormularioSituacionTerapeutica from "./NewTherapeuticSituation";
export default function PatientDetails({ patient }) {
  const [vista, setVista] = useState("datos");

  if (!patient) {
    return (
      <Box textAlign="center" sx={{ mt: 10 }}>
        <Typography variant="h6">Pacientes</Typography>
        <Typography variant="body2" color="text.secondary">
          Selecciona un paciente para ver más información
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: "#f5f5f5",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", 
      }}
    >
      {vista === "datos" && (
        <>
          <Typography variant="h6" gutterBottom>
            Datos Filiatorios
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre completo"
                fullWidth
                value={patient.name || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Parentesco"
                fullWidth
                value={patient.role || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fecha de nacimiento"
                fullWidth
                value={patient.birthDate || "dd-mm-yyyy"}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Documento"
                fullWidth
                value={patient.document || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mail"
                fullWidth
                value={patient.email || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Plan médico"
                fullWidth
                value={patient.plan || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Teléfono"
                fullWidth
                value={patient.phone || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button
              variant="contained"
              onClick={() => setVista("historial")}
              sx={{
                textTransform: "none",
                backgroundColor: "#C7CBD7",
                color: "black",
                "&:hover": { backgroundColor: "#B0B4C0" },
              }}
            >
              Historial Clínico
            </Button>

            <Button
              variant="contained"
              onClick={() => setVista("situacion")}
              sx={{
                textTransform: "none",
                backgroundColor: "#4266d3ff",
                color: "black",
                "&:hover": { backgroundColor: "#cc7340ff" },
              }}
            >
              Situación Terapéutica
            </Button>
          </Stack>
        </>
      )}

      {vista === "historial" && (
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <HistorialMedico patient={patient} />
        </Box>
      )}

      {vista === "situacion" && (
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <SituacionTerap patient={patient} setVista={setVista} />
        </Box>
      )}
      {vista === "nueva" && (
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 600 }}>
              <FormularioSituacionTerapeutica />
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => setVista("situacion")}
              >
                Volver
              </Button>
            </Box>
          </Box>
        )}
    </Box>
  );
}