// src/components/TabDash.jsx
import * as React from "react";
import { Box, Stack } from "@mui/material";
import TablaPaginacion from "./TablaPaginacion";
import Dashboard from "./Dashboard";

export default function TabDash({ prestadorId, tipo }) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }} // móvil apila, desktop lado a lado
      sx={{
        width: "100%",
        height: "100%",
        alignItems: "stretch",
        gap: 2,
        px: 2,
        py: 2,
      }}
    >
      {/* --- IZQUIERDA: TABLA (70%) --- */}
      <Box
        sx={{
          flex: { xs: "1 1 auto", md: "0 0 70%" },
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
          <TablaPaginacion />
        </Box>
      </Box>

      {/* --- DERECHA: DASHBOARD (30%) --- */}
      <Box
        sx={{
          flex: { xs: "1 1 auto", md: "0 0 30%" },
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          borderRadius: 4,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
          backgroundColor: "#fff",
        }}
      >
        <Dashboard
          prestadorId={prestadorId}
          tipo={tipo}
          showLegend={true}
          chartWidth={320}
          chartHeight={420}
          cardHeight={100}
        />
      </Box>
    </Stack>
  );
}
