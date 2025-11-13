// src/components/TabDash.jsx
import * as React from "react";
import { Box, Stack } from "@mui/material";
import TablaPaginacion from "./TablaPaginacion";
import Dashboard from "./Dashboard";

export default function TabDash({ prestadorId: propPrestadorId, tipo }) {
    const [prestadorId, setPrestadorId] = React.useState(propPrestadorId || null);
    const [seleccion, setSeleccion] = React.useState(null);
    const [actualizar, setActualizar] = React.useState(false);

    React.useEffect(() => {
      if (!propPrestadorId) {
        fetch("http://localhost:3000/prestadores")
          .then((res) => res.json())
          .then((data) => {
            if (data.length > 0) setPrestadorId(data[0]._id);
          })
          .catch((err) => console.error("Error al obtener prestadores:", err));
        }
      }, [propPrestadorId]);

      return (
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{
            width: "100%",
            height: "100%",
            alignItems: "stretch",
            gap: 2,
            px: 2,
            py: 2,
          }}
        >
          <Box
            sx={{
              flex: { xs: "1 1 auto", md: "0 0 70%" },
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
              {prestadorId ?(<TablaPaginacion
                prestadorId={prestadorId}
                tipo={tipo}
                onSelectSolicitud={setSeleccion}
                onUpdate={() => setActualizar((prev) => !prev)} // Recarga de pagina
              />) : (
                    <Box sx={{ p: 3, textAlign: "center" }}>Cargando prestador...</Box>
                  )}
            </Box>
          </Box>
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "0 0 %30" }, // ← ancho fijo en desktop, full ancho en móvil
              minWidth: { xs: "100%", md: 360 },
              maxWidth: { md: 400 }, // opcional: límite máximo de ancho
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              borderRadius: 4,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
              backgroundColor: "#fff",
              overflow: "hidden", // evita que el contenido se desborde
            }}
          >
            {prestadorId ? (
              <Dashboard
                  prestadorId={prestadorId}
                  tipo={tipo}
                  showLegend={true}
                  chartWidth={320}
                  chartHeight={420}
                  cardHeight={100}
                  actualizar={actualizar}
                />
                  ) : (
                    <Box sx={{ p: 3, textAlign: "center" }}>Cargando prestador...</Box>
                  )
            }
          </Box>
        </Stack>
      );
  }

