import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Paper,
  CircularProgress,
  Box,
  Button,
  Modal,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import { useSolicitudesPrestador } from "../hooks/useSolicitudesPrestador";

export default function TablaPaginacion({ tipo }) {
  const [pageSize, setPageSize] = React.useState(5);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = React.useState(null);

  // ⚙️ ID del prestador (por ahora hardcodeado)
  const prestadorId = "690d7050cf8cd29515065ad6";

  const { solicitudes, loading, error } = useSolicitudesPrestador(prestadorId);

  // 📋 Definición de columnas
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "Integrante", headerName: "Integrante", flex: 2 },
    { field: "Lugar", headerName: "Lugar de atención", flex: 2 },
    { field: "FormaPago", headerName: "Forma de pago", flex: 2 },
    { field: "Estado", headerName: "Estado", flex: 1.5 },
    {
      field: "Detalle",
      headerName: "Detalle",
      flex: 1.5,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => setSolicitudSeleccionada(params.row)}
        >
          Ver detalle
        </Button>
      ),
    },
    {
      field: "Acciones",
      headerName: "Acciones",
      flex: 1.5,
      renderCell: () => (
        <Button variant="contained" size="small" color="primary">
          Editar
        </Button>
      ),
    },
  ];

  // 🧠 Mapear datos reales del backend al formato de la tabla
  const rows = solicitudes.map((s, index) => ({
    id: s._id || index,
    Integrante: `${s.pacienteId?.nombre || ""} ${s.pacienteId?.apellido || ""}`,
    Lugar: s.prestadorId?.lugaresAtencion?.[0]?.nombre || "—",
    FormaPago: s.tipo || "—", // por ahora usamos tipo como forma de pago
    Estado: s.estado || "—",
  }));

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400 }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <p style={{ color: "red" }}>Error al cargar solicitudes.</p>;
  }

  return (
    <>
      <Paper sx={{ height: 780, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
          rowsPerPageOptions={[3, 5, 10]}
          pagination
          sx={{ border: 0, cursor: "pointer" }}
        />
      </Paper>

      {/* 🪟 Modal de detalle */}
      <Modal
        open={!!solicitudSeleccionada}
        onClose={() => setSolicitudSeleccionada(null)}
        aria-labelledby="detalle-solicitud-titulo"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper sx={{ maxWidth: 500, p: 3, borderRadius: 3 }}>
          <Typography id="detalle-solicitud-titulo" variant="h6" gutterBottom>
            Detalle de la Solicitud
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {solicitudSeleccionada ? (
            <Stack spacing={1.5}>
              <Typography>
                <strong>ID:</strong> {solicitudSeleccionada.id}
              </Typography>
              <Typography>
                <strong>Integrante:</strong> {solicitudSeleccionada.Integrante}
              </Typography>
              <Typography>
                <strong>Lugar de atención:</strong> {solicitudSeleccionada.Lugar}
              </Typography>
              <Typography>
                <strong>Forma de pago:</strong> {solicitudSeleccionada.FormaPago}
              </Typography>
              <Typography>
                <strong>Estado:</strong> {solicitudSeleccionada.Estado}
              </Typography>
            </Stack>
          ) : (
            <Typography>No hay información para mostrar.</Typography>
          )}
          <Box mt={3} textAlign="right">
            <Button variant="contained" onClick={() => setSolicitudSeleccionada(null)}>
              Cerrar
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
}

