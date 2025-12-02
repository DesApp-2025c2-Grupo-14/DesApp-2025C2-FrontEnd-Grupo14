// src/components/TablaPaginacion.jsx
import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { PrestadorContext } from "../context/PrestadorContext";

import {
  Paper,
  CircularProgress,
  Box,
  Button,
  Modal,
  Typography,
  Divider,
  Stack,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useSolicitudesPrestador } from "../hooks/useSolicitudesPrestador";
import dayjs from "dayjs";

const BACKEND_URL = 'http://localhost:3000'

async function getDetalle(tipo, id) {
  const response = await axios.get(`${BACKEND_URL}/solicitudes/detalle/${tipo}/${id}`);
  return Promise.resolve(response.data);
}

export default function TablaPaginacion({ tipo, onSelectSolicitud, onUpdate, rangoAplicado, centroMedico }) {
  const { prestadorCentroSeleccionado } = useContext(PrestadorContext);
  const prestadorLogueado = JSON.parse(localStorage.getItem("prestador"));
  const prestadorId =
    prestadorCentroSeleccionado?._id ||            // centro elegido
    prestadorLogueado?.prestador?._id ||          // prestador individual
    prestadorLogueado?._id ||                     // fallback por si acaso
    null;
  const [solicitudSeleccionada, setSolicitudSeleccionada] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [nuevoEstado, setNuevoEstado] = React.useState("");
  const [motivo, setMotivo] = React.useState("");
  const [solicitudId, setSolicitudId] = React.useState(null);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [mensajeSnackbar, setMensajeSnackbar] = React.useState("");
  const [tipoSnackbar, setTipoSnackbar] = React.useState("success");
  const [detalle, setDetalle] = React.useState(null);
  const [formError, setFormError] = useState({});
  const { solicitudes, loading, error, setError, refetch } = useSolicitudesPrestador(
    prestadorId,
    tipo,
    rangoAplicado,
    centroMedico
  );
  console.log(rangoAplicado)

  React.useEffect(() => {
      if (!solicitudSeleccionada) {
        setDetalle(null);
        return;
      }
  
      const fetchDetalle = async () => {
        try {
          setDetalle(await getDetalle(solicitudSeleccionada.tipo, solicitudSeleccionada.id));
        } catch (err) {
          console.error(err);
        }
      };

      fetchDetalle();
    }, [solicitudSeleccionada]);

  const handleOpen = (id, estado) => {
    setSolicitudId(id);
    setNuevoEstado(estado);
    setFormError({});
    setOpen(true);
  };

  const handleClose = () => {
    setMotivo("");
    setErrorMotivo(null)
    setOpen(false);
    setFormError({});
  };

  const handleConfirm = async () => {
      const nuevoError = {};
      if (!motivo.trim()) nuevoError.motivo = "El motivo es obligatorio";

      setFormError(nuevoError);
      if (Object.keys(nuevoError).length > 0 && nuevoEstado != "Aprobada" ) return;

      try {
        await axios.patch(`${BACKEND_URL}/solicitudes/${solicitudId}`, {
          estado: nuevoEstado,
          motivo,
          prestadorId,
        });

        setMensajeSnackbar("Solicitud actualizada correctamente");
        setTipoSnackbar("success");
        setOpenSnackbar(true);

        await refetch();
        onUpdate?.();
      } catch (err) {
        console.error("Error al actualizar estado:", err);
        setMensajeSnackbar("La solicitud no se pudo actualizar");
        setTipoSnackbar("error");
        setOpenSnackbar(true);
      } finally {
        handleClose();
      }
    };
      const solicitudesFiltradas = React.useMemo(() => {
    if (!tipo) return solicitudes;
    return solicitudes.filter((s) => s.tipo?.toLowerCase() === tipo.toLowerCase());
  }, [solicitudes, tipo]);


  const columns = [
    { field: "Paciente", headerName: "Paciente", flex: 1.2, headerAlign: "center" },
    { field: "Lugar", headerName: "Lugar de atención", flex: 1.2, headerAlign: "center" },
    { field: "Especialidad", headerName: "Especialidad", flex: 1, headerAlign: "center" },
    { field: "FechaPrestacion", headerName: "Fecha de prestación", flex: 1, headerAlign: "center" },
    { field: "Estado", headerName: "Estado", flex: 1, headerAlign: "center" },

    {
      field: "Detalle",
      headerName: "Detalle",
      flex: 0.8,
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            setSolicitudSeleccionada({tipo: params.row.tipo, id: params.row.id}
            );
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
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => handleOpen(params.row.id, "Aprobada")}
              disabled={["Aprobada", "Rechazada"].includes(params.row.Estado)}
            >
              Ac
            </Button>

            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => handleOpen(params.row.id, "Rechazada")}
              disabled={["Aprobada", "Rechazada"].includes(params.row.Estado)}
            >
              Re
            </Button>

            <Button
              variant="contained"
              size="small"
              color="warning"
              onClick={() => handleOpen(params.row.id, "Observada")}
              disabled={["Aprobada", "Rechazada", "Observada"].includes(params.row.Estado)}
            >
              Obs
            </Button>
          </Box>

          {/* MODAL DE CAMBIO */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              Indique el motivo para {nuevoEstado}
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
                error={
                  ["Rechazada", "Observada"].includes(nuevoEstado) && !!formError.motivo
                }
                helperText={
                  ["Rechazada", "Observada"].includes(nuevoEstado) ? formError.motivo : ""
                }
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

  const rows = solicitudesFiltradas.map((s, index) => ({
    id: s._id || index,
    tipo: s.tipo,
    Paciente: `${s.paciente?.nombre || ""} ${s.paciente?.apellido || ""}`.trim(),
    Lugar: s.lugar || "—",
    Estado: s.estado,
    FechaPrestacion: s.fechaPrestacion
      ? new Date(s.fechaPrestacion).toLocaleDateString("es-AR")
      : "—",
    Medico: s.medico || "—",
    Especialidad: s.especialidad || "—"
  }));

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400 }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <p style={{ color: "red" }}>Error al cargar solicitudes.</p>;

  return (
    <>
      <Paper sx={{ width: "100%", height: "100%", overflow: "visible", display: "flex", flexDirection: "column" }}>
        <Stack direction="column" sx={{ width: "100%", height: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={15}
            sx={{
              height: "100%",
              border: 0,
              cursor: "pointer",
              "& .MuiDataGrid-columnHeaders": { fontWeight: "bold", fontSize: "0.85rem" },
              "& .MuiDataGrid-cell": {
                padding: "2px 4px",
                fontSize: "0.85rem",
                display: "flex",
                justifyContent: "center",
              },
            }}
          />
        </Stack>
      </Paper>

      <Modal
        open={!!detalle}
        onClose={() => setSolicitudSeleccionada(null)}
        aria-labelledby="detalle-solicitud-titulo"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}
      >
        <Paper sx={{ width: "100%",
                      maxWidth: 600,
                      height: "auto",
                      maxHeight: "80vh",
                      overflowY: "auto",
                      p: 3,
                      borderRadius: 3, }}>
          <Typography id="detalle-solicitud-titulo" variant="h6" gutterBottom>
            Detalle de la Solicitud
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {detalle ? (
            <>
              <Stack spacing={0.5}>
                <Typography>
                  <strong>Fecha:</strong> {dayjs(detalle.fechaPrestacion)
                                          .tz("America/Argentina/Buenos_Aires")
                                          .format("DD/MM/YYYY")}
                </Typography>
                <Typography>
                  <strong>Paciente:</strong> {detalle.paciente.nombre + ' ' + detalle.paciente.apellido}
                </Typography>
                <Typography>
                  <strong>Lugar:</strong> {detalle.lugar || "-" }
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
                { centroMedico &&
                  (<>
                    <Typography>
                      <strong>Médico:</strong> {detalle.medico}
                    </Typography>
                  </>)
                }
                { detalle.tipo === "Reintegro" &&
                  (<>
                    <Typography>
                      <strong>Especialidad:</strong> {detalle.especialidad}
                    </Typography>
                    <Typography>
                      <strong>Forma de pago:</strong> {detalle.reintegro.pago}
                    </Typography>
                    <Typography>
                      <strong>Total:</strong> {detalle.reintegro.valorTotal}
                    </Typography>
                    <Typography>
                      <strong>CBU:</strong> {detalle.reintegro.cbu}
                    </Typography>
                    <Typography>
                      <strong>Facturado A:</strong> {detalle.reintegro.facturadoA}
                    </Typography>
                    <Typography>
                      <strong>CUIT:</strong> {detalle.reintegro.cuit}
                    </Typography>
                  </>)
                }

                { detalle.tipo === "Receta" &&
                  (<>
                    <Typography>
                      <strong>Medicamento:</strong> {detalle.receta?.medicamento}
                    </Typography>
                    <Typography>
                      <strong>Cantidad:</strong> {detalle.receta?.cantidad}
                    </Typography>
                    <Typography>
                      <strong>Presentación:</strong> {detalle.receta?.presentacion}
                    </Typography>
                  </>)
                }

                { detalle.tipo === "Autorizacion" &&
                  (<>
                    <Typography>
                      <strong>Dias de internación:</strong> {detalle.autorizacion?.diasInternacion}
                    </Typography>
                  </>)
                }
                
                <Typography>
                  <strong>Estado:</strong> {detalle.estado}
                </Typography>
                <Typography>
                  <strong>Motivo de ac/re/obs:</strong> {detalle.motivo || "-"}
                </Typography>
              </Stack>
              <Divider sx={{ my: 2 }} />
              
                
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
                    {detalle.observaciones || "—"}
                  </Box>  
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

      {/* SNACKBAR */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={tipoSnackbar} sx={{ width: "100%" }}>
          {mensajeSnackbar}
        </Alert>
      </Snackbar>
    </>
  );
}






