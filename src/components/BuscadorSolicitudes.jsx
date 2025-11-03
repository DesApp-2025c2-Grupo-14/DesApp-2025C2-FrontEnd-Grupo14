import { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    ButtonBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

export function BuscadorSolicitudes({ onSolicitudSeleccionada }) {
    const [busqueda, setBusqueda] = useState("");
    const [resultados, setResultados] = useState([]);
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);
    const [seleccionado, setSeleccionado] = useState(null);
    const [todasLasSolicitudes, setTodasLasSolicitudes] = useState([]);

    // --- Cargar solicitudes del backend ---
    async function getSolicitudes() {
        const response = await axios.get("http://localhost:3000/solicitudes");
        return response.data;
    }

    useEffect(() => {
        const fetchSolicitudes = async () => {
        try {
            const data = await getSolicitudes();
            setTodasLasSolicitudes(data);
        } catch (error) {
            console.error("Error cargando solicitudes:", error);
        }
        };
        fetchSolicitudes();
    }, []);

    // --- Buscar ---
    const handleSearch = (e) => {
        e.preventDefault();
        const textoBusqueda = busqueda.trim();
        setBusquedaRealizada(true);

        if (textoBusqueda === "" || textoBusqueda.length < 3) {
        setResultados([]);
        return;
        }

        // filtra por nombre de integrante, tipo o estado
        const filtradas = todasLasSolicitudes.filter((sol) =>
        [sol.integrante, sol.tipo, sol.estado]
            .join(" ")
            .toLowerCase()
            .includes(textoBusqueda.toLowerCase())
        );

        setResultados(filtradas);
    };

    return (
        <Box
        component="form"
        onSubmit={handleSearch}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
        <TextField
            label="Buscar solicitud (nombre, tipo, estado)"
            variant="outlined"
            size="small"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            InputLabelProps={{
            sx: { fontSize: "0.8rem" },
            }}
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <IconButton type="submit" aria-label="buscar" edge="start">
                    <SearchIcon />
                </IconButton>
                </InputAdornment>
            ),
            }}
        />

        {busquedaRealizada && resultados.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
            No se encontraron resultados
            </Typography>
        ) : (
            <Stack spacing={2} sx={{ maxHeight: "75vh", overflowY: "auto" }}>
            {resultados.map((sol, i) => (
                <Paper
                component={ButtonBase}
                onClick={() => {
                    setSeleccionado(i);
                    if (onSolicitudSeleccionada) onSolicitudSeleccionada(sol);
                }}
                key={i}
                sx={{
                    padding: 2,
                    borderRadius: 3,
                    border: "2px solid black",
                    bgcolor: seleccionado === i ? "#0146ab" : "#F2F2F2",
                    color: seleccionado === i ? "white" : "black",
                    textAlign: "left",
                }}
                >
                <Stack>
                    <Typography variant="h6">{sol.integrante}</Typography>
                    <Typography variant="body2">
                    {sol.tipo} — {sol.estado}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {sol.fecha} | {sol.lugar}
                    </Typography>
                </Stack>
                </Paper>
            ))}
            </Stack>
        )}
        </Box>
    );
}

