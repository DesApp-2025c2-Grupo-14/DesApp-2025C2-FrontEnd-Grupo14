import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom"; 

export function Login({ onLoginSuccess }) {
    const [cuit, setCuit] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!cuit.trim()) {
            setError("Ingresá un CUIT válido");
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/prestadores/login/${cuit}`);

            if (!res.ok) {
                setError("CUIT no encontrado");
                return;
            }

            const data = await res.json();
            onLoginSuccess(data); 

            navigate("/");

        } catch (err) {
            setError("Error al conectar con el servidor");
        }
    };

    return (
        <Box 
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f5f5f5"
        >
        <Paper sx={{ p: 4, width: "350px" }} elevation={4}>
            <Typography variant="h5" mb={2} textAlign="center">
            Login Prestadores
            </Typography>

            <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                label="CUIT"
                placeholder="30-71548963-9"
                value={cuit}
                onChange={(e) => setCuit(e.target.value)}
                margin="normal"
            />

            {error && (
                <Typography color="error" sx={{ mt: 1 }}>
                {error}
                </Typography>
            )}

            <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
            >
                Ingresar
            </Button>
            </form>
        </Paper>
        </Box>
    );
}



