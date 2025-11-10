// src/components/TablaPaginacion.jsx
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Paper,CircularProgress,Box,Button,Modal,Typography,Divider,Stack,Toolbar,} from "@mui/material";
import axios from "axios";
import { useSolicitudesPrestador } from "../hooks/useSolicitudesPrestador";

export default function TablaPaginacion({ tipo, onSelectSolicitud, onUpdate }) {
      const [pageSize, setPageSize] = React.useState(5);
      const [solicitudSeleccionada, setSolicitudSeleccionada] = React.useState(null);

      const prestadorId = "691100d516fe41e9f27a68b2";
      const { solicitudes, loading, error, refetch } = useSolicitudesPrestador(prestadorId, tipo);

      const solicitudesFiltradas = React.useMemo(() => {
        if (!tipo) return solicitudes;
        return solicitudes.filter((s) => s.tipo?.toLowerCase() === tipo.toLowerCase());
      }, [solicitudes, tipo]);

      const columns = [
        { field: "Integrante", headerName: "Integrante", flex: 1.2 },
        { field: "Lugar", headerName: "Lugar de atención", flex: 1.2 },
        { field: "FormaPago", headerName: "Forma de pago", flex: 1 },
        { field: "Estado", headerName: "Estado", flex: 1 },
        {
          field: "Detalle",
          headerName: "Detalle",
          flex: 0.8,
          renderCell: (params) => (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setSolicitudSeleccionada(params.row);
                onSelectSolicitud?.(params.row);
              }}
            >
              Ver detalle
            </Button>
          ),
        },
        {
          field: "Acciones",
          headerName: "Acciones",
          flex: 1.2,
          renderCell: (params) => (
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={() => handleEstado(params.row.id, "Aprobada")}
                sx={{
                  minWidth: 28,
                  height: 24,
                  p: 0,
                  fontSize: "0.7rem",
                  lineHeight: 1,
                }}
              >
                Ac
              </Button>
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={() => handleEstado(params.row.id, "Rechazada")}
                sx={{
                  minWidth: 28,
                  height: 24,
                  p: 0,
                  fontSize: "0.7rem",
                  lineHeight: 1,
                }}
              >
                Re
              </Button>
              <Button
                variant="contained"
                size="small"
                color="warning"
                onClick={() => handleEstado(params.row.id, "Observada")}
                sx={{
                  minWidth: 28,
                  height: 24,
                  p: 0,
                  fontSize: "0.7rem",
                  lineHeight: 1,
                }}
              >
                Obs
              </Button>
            </Box>
          ),
        },
      ];

      const rows = solicitudesFiltradas.map((s, index) => ({
        id: s._id || index,
        tipo: s.tipo,
        Integrante: `${s.pacienteId?.nombre || ""} ${s.pacienteId?.apellido || ""}`.trim(),
        Lugar: s.lugar || s.prestadorId?.lugaresAtencion?.[0]?.nombre || "—",
        FormaPago: s.tipo || "—",
        Estado: s.estado || "—",
        fechaPrestacion: s.fechaPrestacion
          ? new Date(s.fechaPrestacion).toLocaleDateString("es-AR")
          : "—",
        observaciones: s.observaciones || "—",
        medico: s.medico || "—",
        especialidad: s.especialidad || "—",
        receta: s.receta || {},
        autorizacion: s.autorizacion || {},
        Motivo: s.motivo || "",
      }));

      // patch para cambio de estado de solicitud
      const handleEstado = async (id, nuevoEstado) => {
        const motivoTexto = prompt(`Ingrese el motivo para ${nuevoEstado}:`) || "";
        try {
          await axios.patch(`http://localhost:3000/solicitudes/${id}`, {
            estado: nuevoEstado,
            motivo: motivoTexto,
            prestadorId,
          });

          alert(`Solicitud ${nuevoEstado.toLowerCase()} correctamente.`);
          await refetch(); // Actualiza la tabla
          onUpdate?.(); // aviso para que se actualice
        } catch (err) {
          console.error("Error al actualizar estado:", err);
          alert("Error al cambiar el estado de la solicitud.");
        }
      };

      if (loading)
        return (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400 }}>
            <CircularProgress />
          </Box>
        );

      if (error) return <p style={{ color: "red" }}>Error al cargar solicitudes.</p>;

  return (
    <>
      <Paper sx={{ width: "100%", p: 1.5, overflow: "visible", display: "flex", flexDirection: "column" }}>
        <Box sx={{ width: "100%" }}>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newSize) => setPageSize(newSize)}
            rowsPerPageOptions={[3, 5, 10]}
            pagination
            sx={{
              border: 0,
              cursor: "pointer",
              "& .MuiDataGrid-columnHeaders": { fontWeight: "bold", fontSize: "0.85rem" },
              "& .MuiDataGrid-cell": { padding: "2px 4px", fontSize: "0.85rem" },
            }}
          />
        </Box>
      </Paper>
      <Modal
        open={!!solicitudSeleccionada}
        onClose={() => setSolicitudSeleccionada(null)}
        aria-labelledby="detalle-solicitud-titulo"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}
      >
        <Paper sx={{ maxWidth: 550, p: 3, borderRadius: 3 }}>
          <Typography id="detalle-solicitud-titulo" variant="h6" gutterBottom>
            Detalle de la Solicitud
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {solicitudSeleccionada ? (
            <>
              <Stack spacing={0.5}>
                <Typography>
                  <strong>Fecha:</strong> {solicitudSeleccionada.fechaPrestacion}
                </Typography>
                <Typography>
                  <strong>Integrante:</strong> {solicitudSeleccionada.Integrante}
                </Typography>
                <Typography>
                  <strong>Lugar:</strong> {solicitudSeleccionada.Lugar}
                </Typography>
                <Typography>
                  <strong>Estado:</strong> {solicitudSeleccionada.Estado}
                </Typography>
              </Stack>
              <Divider sx={{ my: 2 }} />
              {solicitudSeleccionada.tipo === "Receta" ? (
                <>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="column" alignItems="center">
                      <Typography variant="h6">Medicamento</Typography>
                      <Toolbar>{solicitudSeleccionada.receta?.medicamento || "—"}</Toolbar>
                    </Stack>
                    <Stack direction="column" alignItems="center">
                      <Typography variant="h6">Cantidad</Typography>
                      <Toolbar>{solicitudSeleccionada.receta?.cantidad || "—"}</Toolbar>
                    </Stack>
                  </Stack>
                  <Stack width="100%" direction="column" alignItems="center">
                    <Typography variant="h6">Presentación</Typography>
                    <Toolbar>{solicitudSeleccionada.receta?.presentacion || "—"}</Toolbar>
                  </Stack>
                </>
              ) : solicitudSeleccionada.tipo === "Autorizacion" ? (
                <>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="column" alignItems="center">
                      <Typography variant="h6">Médico</Typography>
                      <Toolbar>{solicitudSeleccionada.medico}</Toolbar>
                    </Stack>
                    <Stack direction="column" alignItems="center">
                      <Typography variant="h6">Especialidad</Typography>
                      <Toolbar>{solicitudSeleccionada.especialidad}</Toolbar>
                    </Stack>
                  </Stack>
                  <Stack width="100%" direction="column" alignItems="center">
                    <Typography variant="h6">Días de internación</Typography>
                    <Toolbar>{solicitudSeleccionada.autorizacion?.diasInternacion || "—"}</Toolbar>
                  </Stack>
                </>
              ) : (
                <>
                  <Typography variant="h6">Observaciones</Typography>
                  <Box
                    sx={{
                      height: "15vh",
                      bgcolor: "#2E4CA6",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      overflowY: "auto",
                      color: "white",
                    }}
                  >
                    {solicitudSeleccionada.observaciones || "—"}
                  </Box>
                </>
              )}
            </>
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





