import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export function Inicio({ prestador }) {
    if (!prestador) return null; 

    return (
        <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f5f5f5"
        >
        <Paper
            elevation={4}
            sx={{
            p: 4,
            width: "450px",
            textAlign: "center",
            }}
        >
            <Typography variant="h4" mb={2}>
            Bienvenido
            </Typography>

            <Typography variant="h5" fontWeight="bold">
            {prestador.nombre}
            </Typography>

            {prestador.especialidad && (
            <Typography variant="h6" mt={2}>
                Especialidad: <strong>{prestador.especialidad}</strong>
            </Typography>
            )}
        </Paper>
        </Box>
    );
}
