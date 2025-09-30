import { Grid, Box } from "@mui/material";
import PatientSearch from "../components/PatientSearch";
import PatientList from "../components/PatientList";
import PatientDetails from "../components/PatientDetails";
import usePatients from "../hooks/usePatients";

export default function PatientsPage() {
  const { patients, filteredPatients, selectPatient, selectedPatient, searchPatient } =
    usePatients();

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#fae6a7e1",
        boxSizing: "border-box", // asegura que los bordes entren en el cálculo
      }}
    >
      {/* Columna izquierda */}
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          border: "8px solid #fae6a7e1",
          p: 2,
          backgroundColor: "#fff",
          height: "100%",
          overflowY: "auto",
          "&::-webkit-scrollbar": { display: "none" }, // oculta scrollbar
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          boxSizing: "border-box",
        }}
      >
        <PatientSearch onSearch={searchPatient} />
        <PatientList
          patients={filteredPatients}
          onSelect={selectPatient}
          selectedPatient={selectedPatient}
        />
      </Grid>

      {/* Columna derecha */}
      <Grid item xs={12} md={8} sx={{ height: "100%", overflow: "hidden" }}>
        <Box
          sx={{
            height: "100%",
            p: { xs: 2, md: 4 },
            border: "8px solid #fae6a7e1", 
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <PatientDetails patient={selectedPatient} />
        </Box>
      </Grid>
    </Grid>
  );
}
