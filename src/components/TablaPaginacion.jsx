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

export default function TablaPaginacion({ tipo, onSelectSolicitud, onUpdate, rangoAplicado }) {
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
  const { solicitudes, loading, error, refetch } = useSolicitudesPrestador(
    prestadorId,
    tipo,
    rangoAplicado
  );
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
    { field: "Observaciones", headerName: "Observaciones", flex: 1, headerAlign: "center" },
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
    Observaciones: s.observaciones || "—",
    Medico: s.medico || "—",
    Especialidad: s.especialidad || "—",
    Motivo: s.motivo || "—",
    receta: s.receta || {},
    autorizacion: s.autorizacion || {},
    reintegro: s.reintegro || {},
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






