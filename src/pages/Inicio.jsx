import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Paper, Button, ButtonGroup } from "@mui/material";
import axios from "axios";
import { PrestadorContext } from "../context/PrestadorContext";

export function Inicio({ prestador }) {
    const [esCentroMedico, setEsCentroMedico] = useState(false);
    const [prestadoresCentro, setPrestadoresCentro] = useState([]);
    const [prestadorSeleccionado, setPrestadorSeleccionado] = useState(null);

    // ⬇️ Importante: Guardamos globalmente el prestador elegido
    const { setPrestadorCentroSeleccionado } = useContext(PrestadorContext);

    useEffect(() => {
        if (!prestador) return;

        const esCM = !prestador.especialidad; 
        setEsCentroMedico(esCM);

        if (esCM) {
            fetchPrestadoresCentro(prestador._id);
        }
    }, [prestador]);

    const fetchPrestadoresCentro = async (idCentro) => {
        try {
            const res = await axios.get(`http://localhost:3000/centroMedico/${idCentro}/prestadores`);
            setPrestadoresCentro(res.data.prestadores || []);
        } catch (error) {
            console.error("Error cargando prestadores del centro:", error);
        }
    };

    // ⬇️ Cuando seleccionan uno
    const seleccionarPrestador = (p) => {
        setPrestadorSeleccionado(p);
        setPrestadorCentroSeleccionado(p); // guardado global
    };

    // ⬇️ Cuando vuelven atrás
    const volver = () => {
        setPrestadorSeleccionado(null);
        setPrestadorCentroSeleccionado(null);
    };

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
                        {!prestadorSeleccionado && (
                            <>
                                <Typography variant="h6" mt={2}>
                                    Seleccioná una especialidad
                                </Typography>

                                <ButtonGroup sx={{ mt: 2 }} variant="contained" disableElevation>
                                    {prestadoresCentro.map((p) => (
                                        <Button key={p._id} onClick={() => seleccionarPrestador(p)}>
                                            {p.especialidad}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </>
                        )}

                        {prestadorSeleccionado && (
                            <>
                                <Typography variant="h6" mt={3} fontWeight="bold">
                                    {prestadorSeleccionado.nombre}
                                </Typography>

                                <Typography variant="h6" mt={1}>
                                    Especialidad: <strong>{prestadorSeleccionado.especialidad}</strong>
                                </Typography>

                                <Button variant="outlined" sx={{ mt: 3 }} onClick={volver}>
                                    Volver
                                </Button>
                            </>
                        )}
                    </>
                )}
            </Paper>
        </Box>
    );
}




