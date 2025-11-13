// src/components/TablaPaginacion.jsx
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Paper,CircularProgress,Box,Button,Modal,Typography,Divider,Stack,Toolbar,Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField} from "@mui/material";
import axios from "axios";
import { useSolicitudesPrestador } from "../hooks/useSolicitudesPrestador";
import { DetalleSolicitud } from "./DetalleSolicitud";

export default function TablaPaginacion({ prestadorId, tipo, onSelectSolicitud, onUpdate }) {
      const [pageSize, setPageSize] = React.useState(5);
      const [solicitudSeleccionada, setSolicitudSeleccionada] = React.useState(null);
      const [open, setOpen] = React.useState(false);
      const [nuevoEstado, setNuevoEstado] = React.useState("");
      const [motivo, setMotivo] = React.useState("");
      const [solicitudId, setSolicitudId] = React.useState(null);
      //console.log(prestadorId)
      //const prestadorId = "69125ea6764b18417d396818";
      const handleOpen = (id, estado) => {
        setSolicitudId(id);
        setNuevoEstado(estado);
        setOpen(true);
      };

      const handleClose = () => {
        setMotivo("");
        setOpen(false);
      };

      const handleConfirm = async () => {

        try {
          await axios.patch(`http://localhost:3000/solicitudes/${solicitudId}`, {
            estado: nuevoEstado,
            motivo,
            prestadorId,
          });

          alert(`Solicitud ${nuevoEstado.toLowerCase()} correctamente.`);
          await refetch();
          onUpdate?.();
        } catch (err) {
          console.error("Error al actualizar estado:", err);
          alert("Error al cambiar el estado de la solicitud.");
        } finally {
          handleClose();
        }
      };

      const { solicitudes, loading, error, refetch } = useSolicitudesPrestador(prestadorId, tipo);
      console.log(solicitudes)
      const solicitudesFiltradas = React.useMemo(() => {
        if (!tipo) return solicitudes;
        return solicitudes.filter((s) => s.tipo?.toLowerCase() === tipo.toLowerCase());
      }, [solicitudes, tipo]);
      
      const columns = [
        { field: "Integrante", headerName: "Integrante", flex: 1.2 },
        { field: "Lugar", headerName: "Lugar de atención", flex: 1.2 },
        { field: "Medico", headerName: "Médico", flex: 1 },
        { field: "Especialidad", headerName: "Especialidad", flex: 1 },
        { field: "FechaPrestacion", headerName: "Fecha de prestación", flex: 1 },
        { field: "Observaciones", headerName: "Observaciones", flex: 1 },
        { field: "Estado", headerName: "Estado", flex: 1 },
        //{ field: "Motivo", headerName: "Motivo", flex: 1 },
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
          renderCell: (params) => (<>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={() => handleOpen(params.row.id, "Aprobada")}
                disabled={["Aprobada", "Rechazada"].includes(params.row.Estado)}
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
                onClick={() => handleOpen(params.row.id, "Rechazada")}
                disabled={["Aprobada", "Rechazada"].includes(params.row.Estado)}
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
                onClick={() => handleOpen(params.row.id, "Observada")}
                disabled={["Aprobada", "Rechazada", "Observada"].includes(params.row.Estado)}
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
            <Dialog open={open} onClose={handleClose} sx={{
    "& .MuiBackdrop-root": {
      backgroundColor: "rgba(0, 0, 0, 0.2)", // más oscuro
    },
  }}>
        <DialogTitle>
          Indique el motivo para {nuevoEstado === "Rechazada" ? "rechazar" : nuevoEstado === "Aprobada" ? "aprobar" : "observar"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Motivo"
            type="text"
            fullWidth
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      </>
          ),
        },
      ];
      console.log(solicitudesFiltradas)
      const rows = solicitudesFiltradas.map((s, index) => ({
        id: s._id || index,
        tipo: s.tipo,
        Integrante: `${s.paciente?.nombre || ""} ${s.paciente?.apellido || ""}`.trim(),
        Lugar: s.lugar || "—",
        Estado: s.estado,
        FechaPrestacion: s.fechaPrestacion
          ? new Date(s.fechaPrestacion).toLocaleDateString("es-AR")
          : "—",
        Observaciones: s.observaciones || "—",
        Medico: s.medico || "—",
        Especialidad: s.especialidad || "—",
        Motivo: s.motivo || "—",
        receta: s.receta || {},
        autorizacion: s.autorizacion || {},
        reintegro: s.reintegro || {},
      }));

      // patch para cambio de estado de solicitud
      const handleEstado = async (id, nuevoEstado) => {
        const motivoTexto = prompt(`Ingrese el motivo para ${nuevoEstado}:`) || "";
        if (motivoTexto === null) {
          alert("Cambio de estado cancelado.");
          return;
        }
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
        <Paper sx={{ width: "100%",
                      maxWidth: 600, // 🔹 ancho máximo del modal
                      height: "auto", // 🔹 se ajusta al contenido
                      maxHeight: "80vh", // 🔹 limita la altura a 80% de la ventana
                      overflowY: "auto", // 🔹 agrega scroll si el contenido supera el alto
                      p: 3,
                      borderRadius: 3, }}>
          <Typography id="detalle-solicitud-titulo" variant="h6" gutterBottom>
            Detalle de la Solicitud
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {solicitudSeleccionada ? (
            <>
              <Stack spacing={0.5}>
                <Typography>
                  <strong>Fecha:</strong> {solicitudSeleccionada.FechaPrestacion}
                </Typography>
                <Typography>
                  <strong>Integrante:</strong> {solicitudSeleccionada.Integrante}
                </Typography>
                <Typography>
                  <strong>Lugar:</strong> {solicitudSeleccionada.Lugar}
                </Typography>
                {/* { solicitudSeleccionada.tipo !== "Receta" &&
                  (<>
                    <Typography>
                      <strong>Médico:</strong> {solicitudSeleccionada.Medico}
                    </Typography>
                    <Typography>
                      <strong>Especialidad:</strong> {solicitudSeleccionada.Especialidad}
                    </Typography>
                  </>)
                } */}
                { solicitudSeleccionada.tipo === "Reintegro" &&
                  (<>
                    <Typography>
                      <strong>Médico:</strong> {solicitudSeleccionada.Medico}
                    </Typography>
                    <Typography>
                      <strong>Especialidad:</strong> {solicitudSeleccionada.Especialidad}
                    </Typography>
                    <Typography>
                      <strong>Forma de pago:</strong> {solicitudSeleccionada.reintegro.pago}
                    </Typography>
                    <Typography>
                      <strong>Total:</strong> {solicitudSeleccionada.reintegro.valorTotal}
                    </Typography>
                    <Typography>
                      <strong>CBU:</strong> {solicitudSeleccionada.reintegro.cbu}
                    </Typography>
                    <Typography>
                      <strong>Facturado A:</strong> {solicitudSeleccionada.reintegro.facturadoA}
                    </Typography>
                    <Typography>
                      <strong>CUIT:</strong> {solicitudSeleccionada.reintegro.cuit}
                    </Typography>
                  </>)
                }
                
                <Typography>
                  <strong>Estado:</strong> {solicitudSeleccionada.Estado}
                </Typography>
                <Typography>
                  <strong>Motivo de ac/re/obs:</strong> {solicitudSeleccionada.Motivo || "-"}
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
                      <Toolbar>{solicitudSeleccionada.Medico}</Toolbar>
                    </Stack>
                    <Stack direction="column" alignItems="center">
                      <Typography variant="h6">Especialidad</Typography>
                      <Toolbar>{solicitudSeleccionada.Especialidad}</Toolbar>
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
                    {solicitudSeleccionada.Observaciones || "—"}
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





