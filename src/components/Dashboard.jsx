// components/Dashboard.jsx
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import OutlinedCard from "./CardDashboard";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { useEstadisticasPorTipo } from "../hooks/useEstadisticasPorTipo";

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 18,
  fontWeight: 600,
}));

function PieCenterLabel({ children }) {
  const { width, left, top, height } = useDrawingArea();
  return <StyledText x={left + width / 2} y={top + height / 2}>{children}</StyledText>;
}

export default function Dashboard({
  prestadorId,
  tipo,                 // 'Receta' | 'Autorizacion' | 'Reintegro'
  cardHeight = 120,
  chartWidth = 300,
  chartHeight = 300,
  centerLabel = "Resumen",
  showLegend = true,    // ahora true por defecto
  sx = {},
}) {
  const { loading, error, items, pieData, isEmpty } = useEstadisticasPorTipo(prestadorId, tipo);

  if (!prestadorId) return <Box sx={{ p: 2 }}>Falta <b>prestadorId</b>.</Box>;
  if (!tipo)        return <Box sx={{ p: 2 }}>Falta <b>tipo</b>.</Box>;
  if (loading)      return <Box sx={{ p: 2 }}>Cargando estadísticas…</Box>;
  if (error)        return <Box sx={{ p: 2, color: "red" }}>Error: {error.message}</Box>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", gap: 3, ...sx }}>
      <Box sx={{ textAlign: "center" }}>
        <h2>Dashboard</h2>
      </Box>

      {/* 2 cards por fila SIEMPRE */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: 2,
          width: "100%",
          boxSizing: "border-box",
          px: 2,
          maxHeight: 280,
          overflow: "auto",
        }}
      >
        {items.map((card, index) => (
          <OutlinedCard key={index} title={card.title} value={card.value} height={cardHeight} />
        ))}
      </Box>

      {/* Pie centrado */}
      <Box
        sx={{
          flex: 1,
          minHeight: 220,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minWidth: 0,
          overflow: "visible",
        }}
      >
        <PieChart
          series={[{ data: pieData, innerRadius: 100 }]}
          width={Math.max(chartWidth, 280)}
          height={Math.max(chartHeight, 300)}
          margin={{ top: 10, bottom: showLegend && !isEmpty ? 70 : 10, left: 10, right: 10 }}
          slotProps={{
            legend: {
              hidden: !(showLegend && !isEmpty), // ocultamos si está vacío
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              itemMarkWidth: 14,
              itemMarkHeight: 14,
              padding: 8,
            },
          }}
        >
          <PieCenterLabel>{isEmpty ? "Sin datos" : centerLabel}</PieCenterLabel>
        </PieChart>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  prestadorId: PropTypes.string.isRequired,
  tipo: PropTypes.oneOf(["Receta", "Autorizacion", "Reintegro"]).isRequired,
  cardHeight: PropTypes.number,
  chartWidth: PropTypes.number,
  chartHeight: PropTypes.number,
  centerLabel: PropTypes.string,
  showLegend: PropTypes.bool,
  sx: PropTypes.object,
};
