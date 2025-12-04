import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Paper, Button, ButtonGroup, List, ListItemText, Divider } from "@mui/material";
import axios from "axios";
import { PrestadorContext } from "../context/PrestadorContext";

export function Inicio({ prestador }) {
    const [esCentroMedico, setEsCentroMedico] = useState(false);
    const [prestadoresCentro, setPrestadoresCentro] = useState([]);

    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(null);

    const { setPrestadorCentroSeleccionado } = useContext(PrestadorContext);

    useEffect(() => {
        if (!prestador) return;

        const esCM = !prestador.especialidad;
        setEsCentroMedico(esCM);

        if (esCM) fetchPrestadoresCentro(prestador._id);
    }, [prestador]);

    const fetchPrestadoresCentro = async (idCentro) => {
        try {
            const res = await axios.get(`http://localhost:3000/prestadores/centroMedico/${idCentro}/prestadores`);
            setPrestadoresCentro(res.data.prestadores || []);
        } catch (error) {
            console.error("Error cargando prestadores del centro:", error);
        }
    };
    const especialidadesUnicas = [...new Set(prestadoresCentro.map(p => p.especialidad))];

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
            <Paper elevation={4} sx={{ p: 4, width: "450px", textAlign: "center" }}>
                <Typography variant="h4" mb={2}>Bienvenido</Typography>
                <Typography variant="h5" fontWeight="bold">{prestador.nombre}</Typography>

                {!esCentroMedico && (
                    <Typography variant="h6" mt={2}>
                        Especialidad: <strong>{prestador.especialidad}</strong>
                    </Typography>
                )}

                {esCentroMedico && (
                    <>
                        {/* Botones de especialidades */}
                        <Typography variant="h6" mt={3}>
                            Especialidades
                        </Typography>

                        <ButtonGroup variant="contained" sx={{ mt: 2 }} disableElevation>
                            {especialidadesUnicas.map((esp, i) => (
                                <Button
                                    key={i}
                                    onClick={() =>
                                        setEspecialidadSeleccionada(esp === especialidadSeleccionada ? null : esp)
                                    }
                                    color={esp === especialidadSeleccionada ? "info" : "inherit"}
                                >
                                    {esp}
                                </Button>
                            ))}
                        </ButtonGroup>

                        {/* Prestadores segun especialidad*/}
                        {especialidadSeleccionada && (
                            <Box mt={3} textAlign="center">
                                <Typography variant="h6" fontWeight="bold" mb={1}>
                                    Especialidad: {especialidadSeleccionada}
                                </Typography>

                                <List>
                                    {prestadoresCentro
                                        .filter(p => p.especialidad === especialidadSeleccionada)
                                        .map(p => (
                                            <Box key={p._id}>
                                                <ListItemText
                                                    primary={p.nombre}
                                                    secondary={`CUIT: ${p.cuit || "—"}`}
                                                    sx={{ p: 2,border: "5px solid #6bc0e7ee", borderRadius : "15px"}}
                                                />
                                            </Box>
                                        ))}
                                </List>
                            </Box>
                        )}
                    </>
                )}
            </Paper>
        </Box>
    );
}






