import { useEffect, useState } from "react";
import {Box,Typography,Paper,Stack,Dialog,DialogTitle,DialogContent,Button,Checkbox,} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

export function HistoriaClinica({ datoSeleccionado, onCerrarHistoria }) {
  const [historias, setHistorias] = useState([]);
  const [historiaSeleccionada, setHistoriaSeleccionada] = useState(null);
  const [verSoloMisNotas, setVerSoloMisNotas] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [error, setError] = useState(null);

  const usuarioActual = "Dra. Martínez";

  useEffect(() => {
    if (!datoSeleccionado?._id) {
      setHistorias([]);
      return;
    }

    const fetchHistorias = async () => {
      setError(null);
      try {
        const url = `http://localhost:3000/pacientes/${datoSeleccionado._id}/historiasClinicas`;
        const params = verSoloMisNotas ? { prestador: usuarioActual } : {};
        const response = await axios.get(url, { params });
        setHistorias(response.data.historial);
      } catch (err) {
        setError("Error al cargar las historias clínicas.");
        setHistorias([]);
      }
    };

    fetchHistorias();
  }, [datoSeleccionado?._id, verSoloMisNotas]);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        height: "100%",
        width: "100%",
        p: { xs: 1, md: 3 },
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ width: "100%", mb: 2, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ color: "#1976d2", mb: 2, fontSize: { xs: "1.5rem", md: "2rem" } }}
        >
          Historial Clínico
        </Typography>
        <Stack direction="row" justifyContent="space-between" px={2}>
          <Button variant="outlined" onClick={onCerrarHistoria}>
            Volver
          </Button>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              p: "4px 8px",
              borderRadius: 1,
              fontSize: "0.875rem",
            }}
          >
            <Typography sx={{ mr: 1 }}>Ver mis notas</Typography>
            <Checkbox
              size="small"
              checked={verSoloMisNotas}
              onChange={(e) => setVerSoloMisNotas(e.target.checked)}
            />
          </Box>
        </Stack>
      </Box>

      <Stack
        spacing={2}
        sx={{
          width: "100%",
          maxWidth: "800px",
          overflowY: "auto",
          maxHeight: "65vh",
          p: { xs: 1, md: 2 },
        }}
      >
        {historias.length === 0 ? (
          <Typography
            sx={{ textAlign: "center", color: "#1976d2", fontSize: "18px" }}
          >
            No cuenta con historias clínicas registradas
          </Typography>
        ) : (
          historias.map((historia) => {
            const isExpanded = expanded[historia._id];
            const nota =
              historia.notas?.length > 150
                ? isExpanded
                  ? historia.notas
                  : `${historia.notas.slice(0, 150)}...`
                : historia.notas;

            return (
              <Paper
                key={historia._id}
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "white",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {historia.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fecha: {dayjs(historia.fecha).format("DD/MM/YYYY")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Prestador: {historia.prestador}
                </Typography>
                {historia.notas && (
                  <Box mt={1}>
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "justify",
                        whiteSpace: "pre-line",
                        wordBreak: "break-word",
                      }}
                    >
                      {nota}
                    </Typography>
                    {historia.notas.length > 150 && (
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => toggleExpand(historia._id)}
                        sx={{ mt: 1 }}
                      >
                        {isExpanded ? "Ver menos" : "Ver más"}
                      </Button>
                    )}
                  </Box>
                )}
              </Paper>
            );
          })
        )}
      </Stack>
    </Stack>
  );
}