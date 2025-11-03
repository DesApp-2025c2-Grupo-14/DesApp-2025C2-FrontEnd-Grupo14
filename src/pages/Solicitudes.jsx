import React, { useState } from "react";
import { Box, Stack, Typography, Paper, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { KpiCard } from "../components/KpiCard";
import { KpiChart } from "../components/KpiChart";
import { DetalleSolicitud } from "../components/DetalleSolicitud";
import { BuscadorSolicitudes } from "../components/BuscadorSolicitudes";

export function Solicitudes() {
  const [seleccion, setSeleccion] = useState(null);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("Reintegros");

  // 🔹 Datos mock de ejemplo
  const data = [
    {
      id: 1,
      integrante: "Jon Snow",
      fecha: "2025-10-15",
      lugar: "Hospital A",
      formaPago: "Efectivo",
      estado: "Activo",
      detalle: "Detalle 1",
      tipo: "Reintegro",
      descripcion: "Reintegro de gastos médicos por consulta clínica.",
      importe: "$12.000",
    },
    {
      id: 2,
      integrante: "Cersei Lannister",
      fecha: "2025-10-14",
      lugar: "Clínica B",
      formaPago: "Tarjeta",
      estado: "Pendiente",
      detalle: "Detalle 2",
      tipo: "Receta",
      descripcion: "Solicitud de autorización para medicamentos.",
      importe: "$4.800",
    },
    {
      id: 3,
      integrante: "Jaime Lannister",
      fecha: "2025-10-13",
      lugar: "Hospital C",
      formaPago: "Efectivo",
      estado: "Activo",
      detalle: "Detalle 3",
      tipo: "Autorización",
      descripcion: "Estudio de diagnóstico por imágenes.",
      importe: "$9.500",
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "integrante", headerName: "Integrante", flex: 1 },
    { field: "fecha", headerName: "Fecha", flex: 1 },
    { field: "lugar", headerName: "Lugar de atención", flex: 1 },
    { field: "formaPago", headerName: "Forma de pago", flex: 1 },
    { field: "estado", headerName: "Estado", flex: 1 },
    { field: "detalle", headerName: "Detalle", flex: 1 },
  ];

  const kpis = [
    { titulo: "Pendientes", valor: "10.000", color: "#E0A800" },
    { titulo: "Aceptados", valor: "6.400", color: "#2E4CA6" },
    { titulo: "Rechazados", valor: "2.000", color: "#C62828" },
    { titulo: "En observación", valor: "3.000", color: "#616161" },
  ];

  const chartData = [
    { titulo: "Pendientes", valor: 10000 },
    { titulo: "Aceptados", valor: 6400 },
    { titulo: "Rechazados", valor: 2000 },
    { titulo: "En observación", valor: 3000 },
  ];

  const handleSeleccion = (tipo) => {
    setTipoSeleccionado(tipo);
  };
  const dataFiltrada = data.filter((s) => {
    if (tipoSeleccionado === "Reintegros") return s.tipo === "Reintegro";
    if (tipoSeleccionado === "Autorizaciones") return s.tipo === "Autorización";
    if (tipoSeleccionado === "Recetas") return s.tipo === "Receta";
    return true;
  });
  if (seleccion) {
    return (
      <DetalleSolicitud
        solicitud={seleccion}
        onVolver={() => setSeleccion(null)}
      />
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        width: "100%",
        height: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F7F8FA",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Mis solicitudes
        </Typography>
        <Box sx={{ width: 300 }}>
          <BuscadorSolicitudes
            onSolicitudSeleccionada={(sol) => setSeleccion(sol)}
          />
        </Box>
      </Stack>
      <Stack direction="row" spacing={4} sx={{ mb: 3 }}>
        <Button
          variant={tipoSeleccionado === "Reintegros" ? "contained" : "outlined"}
          color={tipoSeleccionado === "Reintegros" ? "primary" : "inherit"}
          onClick={() => handleSeleccion("Reintegros")}
        >
          Reintegros
        </Button>

        <Button
          variant={
            tipoSeleccionado === "Autorizaciones" ? "contained" : "outlined"
          }
          color={tipoSeleccionado === "Autorizaciones" ? "primary" : "inherit"}
          onClick={() => handleSeleccion("Autorizaciones")}
        >
          Autorizaciones
        </Button>

        <Button
          variant={tipoSeleccionado === "Recetas" ? "contained" : "outlined"}
          color={tipoSeleccionado === "Recetas" ? "primary" : "inherit"}
          onClick={() => handleSeleccion("Recetas")}
        >
          Recetas
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ flex: 1, minHeight: 0 }}>
        {/* TABLA */}
        <Paper
          elevation={1}
          sx={{
            flex: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DataGrid
            rows={dataFiltrada}
            columns={columns}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            onRowClick={(params) => setSeleccion(params.row)}
            sx={{
              flex: 1,
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#F4F5FA",
                cursor: "pointer",
              },
            }}
          />
        </Paper>
        <Stack
          flex={1}
          spacing={2}
          alignItems="stretch"
          justifyContent="flex-start"
          sx={{ minHeight: "100%" }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 1.5,
              justifyItems: "center",
            }}
          >
            {kpis.map((kpi, index) => (
              <KpiCard
                key={index}
                title={kpi.titulo}
                value={kpi.valor}
                color={kpi.color}
              />
            ))}
          </Box>

          <Paper
            elevation={1}
            sx={{
              mt: 1,
              p: 2,
              borderRadius: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              minHeight: 180,
            }}
          >
            <KpiChart data={chartData} />
          </Paper>
        </Stack>
      </Stack>
    </Box>
  );
}

