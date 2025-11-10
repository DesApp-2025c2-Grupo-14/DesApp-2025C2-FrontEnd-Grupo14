import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import OutlinedCard from "./CardDashboard";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { useEstadisticasPorTipo } from "../hooks/useSolicitudesPrestador";

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 18,
  fontWeight: 600,
}));

function PieCenterLabel({ children }) {
  const { width, left, top, height } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function Dashboard({
  prestadorId,
  tipo,
  cardHeight = 100,
  centerLabel = "Resumen",
  showLegend = true,
  actualizar,
  sx = {},
}) {
  const { items, pieData, isEmpty, refetch } = useEstadisticasPorTipo(
    prestadorId,
    tipo
  );

  // 🔄 Refetch cada 10 segundos
  React.useEffect(() => {
    if (!prestadorId || !tipo) return;
    const interval = setInterval(refetch, 10000);
    return () => clearInterval(interval);
  }, [prestadorId, tipo]);

  // 🔁 Refetch al actualizar
  React.useEffect(() => {
    if (actualizar) refetch();
  }, [actualizar]);

  if (!prestadorId)
    return (
      <Box sx={{ p: 2 }}>
        Falta <b>prestadorId</b>.
      </Box>
    );
  if (!tipo)
    return (
      <Box sx={{ p: 2 }}>
        Falta <b>tipo</b>.
      </Box>
    );

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      width: 350, // 📏 ancho fijo del Dashboard
      height: "100%",
      gap: 2,
      overflow: "hidden",
      p: 2,
      boxSizing: "border-box",
      mx: "auto", // centra el contenido horizontalmente
      ...sx,
    }}
  >
    <Box sx={{ textAlign: "center", mb: 1 }}>
      <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Dashboard</h2>
    </Box>

    {/* --- CARDS --- */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 2,
        width: "100%",
        flexShrink: 0,
      }}
    >
      {items.map((card, index) => (
        <OutlinedCard
          key={index}
          title={card.title}
          value={card.value}
          height={"80px"}
        />
      ))}
    </Box>

    {/* --- GRÁFICO --- */}
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
        minHeight: 220,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 320,
          aspectRatio: "1 / 1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PieChart
          series={[
            {
              data: pieData,
              innerRadius: 90,
            },
          ]}
          width={undefined}
          height={undefined}
          margin={{
            top: 10,
            bottom: showLegend && !isEmpty ? 60 : 10,
            left: 10,
            right: 10,
          }}
          slotProps={{
            legend: {
              hidden: !(showLegend && !isEmpty),
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
  </Box>
  );
}

Dashboard.propTypes = {
  prestadorId: PropTypes.string.isRequired,
  tipo: PropTypes.oneOf(["Receta", "Autorizacion", "Reintegro"]).isRequired,
  cardHeight: PropTypes.number,
  centerLabel: PropTypes.string,
  showLegend: PropTypes.bool,
  actualizar: PropTypes.any,
  sx: PropTypes.object,
};


