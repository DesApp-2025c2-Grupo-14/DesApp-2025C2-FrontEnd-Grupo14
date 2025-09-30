// HistorialClinico.jsx
import React from "react";
import { Box, Typography, Card, CardContent, Button, Grid } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const pacienteDemo = {
    name: "Tomás Calderón Paredes",
    document: "35595007",
    birthDate: "22-7-1976",
    email: "oege@gmail.com",
    phone: "11332131532",
    plan: "Marzo2025",
};


const ejemploHistorial = [
    { especialidad: "Cardiología", fecha: "02/08/25" },
    { especialidad: "Neumonología", fecha: "02/08/25" },
    { especialidad: "Reumatología", fecha: "03/09/25" },
    { especialidad: "Infectología", fecha: "02/08/25" },
    { especialidad: "Dermatología", fecha: "02/08/25" },
    { especialidad: "Gastroenterología", fecha: "02/08/25" },
];

export default function HistorialClinico() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const patient = location.state?.patient || pacienteDemo;

    if (!patient) {
        return (
        <Box textAlign="center" sx={{ mt: 6 }}>
            <Typography variant="h6">Paciente no encontrado</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            No llegaron datos del paciente desde PatientDetails. Volver a la lista de pacientes.
            </Typography>
            <Button
            variant="contained"
            onClick={() => navigate(-1)}
            sx={{ textTransform: "none", backgroundColor: "#C7CBD7", color: "black" }}
            >
            Volver
            </Button>
        </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                height: "100%",
                padding: 2,
                boxSizing: "border-box",
            }}
            >
        <Box
                sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                flexWrap: "wrap", // para que se adapte en pantallas pequeñas
                marginBottom: 2,
                }}
        >
                <Typography
                variant="h5"
                sx={{
                    fontWeight: "bold",
                    flex: 1,
                    minWidth: 200,
                    textAlign: "center",
                }}
                >
                Historial clínico — {patient.name}
                </Typography>
                    <Button
                    variant="contained"
                    size="small"
                    sx={{
                        backgroundColor: "#C7CBD7",
                        color: "black",
                        textTransform: "none",
                        marginLeft: 2,
                        marginTop: { xs: 1, sm: 0 },
                        "&:hover": { backgroundColor: "#B0B4C0" },
                    }}
                    >
                    Ver solo mis notas
                    </Button>
            </Box>

            <Box
                sx={{
                backgroundColor: "#787F9B",
                borderRadius: 3,
                padding: 3,
                width: "100%",
                overflowX: "hidden", // evita scroll horizontal
                boxSizing: "border-box",
                }}
            >
                <Grid container spacing={2}>
                {ejemploHistorial.map((item, index) => (
                    <Grid item xs={12} key={index}>
                    <Card
                        sx={{
                        backgroundColor: "#D9D9D9",
                        borderRadius: 2,
                        boxShadow: "none",
                        width: "100%",
                        }}
                    >
                        <CardContent
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "12px 16px",
                            flexWrap: "wrap", // hace que la fecha baje si no entra
                        }}
                        >
                        <Typography sx={{ fontWeight: 500 }}>{item.especialidad}</Typography>
                        <Typography sx={{ fontSize: "0.9rem", color: "gray" }}>
                            Fecha: {item.fecha}
                        </Typography>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
                </Grid>
            </Box>
            </Box>
    );
}