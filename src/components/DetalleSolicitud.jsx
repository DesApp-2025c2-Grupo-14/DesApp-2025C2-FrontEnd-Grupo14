import React from "react";
<<<<<<< HEAD
import { Header } from "./Header";
import {
  Box,
  Stack,
  Divider,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { PropaneSharp } from "@mui/icons-material";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const BACKEND_URL = "http://localhost:3000";
dayjs.extend(utc);
dayjs.extend(timezone);

async function getDetalle(tipo, id) {
  const response = await axios.get(`${BACKEND_URL}/solicitudes/${tipo}/${id}`);
  console.log("backend response");
  console.log(response);
  return Promise.resolve(response.data);
}

export function DetalleSolicitud(props) {
  const [detalle, setDetalle] = React.useState(null);

  React.useEffect(() => {
    if (!props.seleccion || !props.seleccion.tipo || !props.seleccion.id) {
      setDetalle(null); // Limpia el detalle visible
      return;
    }

    const fetchDetalle = async () => {
      try {
        setDetalle(await getDetalle(props.seleccion.tipo, props.seleccion.id));
      } catch (err) {
        console.error(err);
      }
    };
    console.log("hola");
    // fetchDetalle();
    fetchDetalle();
  }, [props.seleccion]);

  console.log(detalle);
  return (
    <Stack
      direction="column"
      width="80%"
      height="100%"
      alignItems="space-between"
    >
      <Header seccion={props.solicitud} usuario="" />
      {detalle && detalle.tipo !== null ? (
        <Toolbar
          sx={{
            bgcolor: "#F9F9FF",
            margin: 2,
            height: "100%",
            py: 2,
            borderRadius: 3,
          }}
        >
          <Stack
            direction="column"
            width="100%"
            height="100%"
            justifyContent="center"
            spacing="auto"
            sx={{
              mx: 2,
            }}
          >
            {
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="column" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    Fecha
                  </Typography>
                  <Toolbar>
                    {(detalle.fechaPrestacion &&
                      dayjs(detalle.fechaPrestacion)
                        .tz("America/Argentina/Buenos_Aires")
                        .format("DD/MM/YYYY HH:mm")) ||
                      "--/--/---- --:--"}
                  </Toolbar>
                </Stack>
                <Stack direction="column" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    Lugar de atención
                  </Typography>
                  <Toolbar>{detalle.lugar || "Sin especificar"}</Toolbar>
                </Stack>
              </Stack>
            }
            <Stack width="100%" direction="column" alignItems="center">
              <Typography variant="h6" color="inherit">
                Paciente
              </Typography>
              <Toolbar>{detalle.paciente.nombre}</Toolbar>
            </Stack>

            {detalle.tipo === "Receta" ? (
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="column" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    Medicamento
                  </Typography>
                  <Toolbar>{detalle.receta.medicamento}</Toolbar>
                </Stack>
                <Stack direction="column" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    Cantidad
                  </Typography>
                  <Toolbar>{detalle.receta.cantidad}</Toolbar>
                </Stack>
              </Stack>
            ) : (
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="column" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    Médico
                  </Typography>
                  <Toolbar>{detalle.medico}</Toolbar>
                </Stack>
                <Stack direction="column" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    Especialidad
                  </Typography>
                  <Toolbar>{detalle.especialidad}</Toolbar>
                </Stack>
              </Stack>
            )}

            {detalle.tipo === "Autorizacion" && (
              <Stack width="100%" direction="column" alignItems="center">
                <Typography variant="h6" color="inherit">
                  Dias de internación
                </Typography>
                <Toolbar>{detalle.autorizacion.diasInternacion}</Toolbar>
              </Stack>
            )}

            {detalle.tipo === "Receta" && (
              <Stack width="100%" direction="column" alignItems="center">
                <Typography variant="h6" color="inherit">
                  Presentación
                </Typography>
                <Toolbar>{detalle.receta.presentacion}</Toolbar>
              </Stack>
            )}
            <Stack>
              <Typography variant="h6" color="inherit">
                Observaciones
              </Typography>
              <Box
                sx={{
                  height: "15vh",
                  bgcolor: "#2E4CA6",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  overflowY: "auto",
                }}
              >
                <Typography
                  variant="body2"
                  color="#F9F9FF"
                  sx={{
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {detalle.observaciones || "Sin observaciones."}
                </Typography>
              </Box>
            </Stack>
            {detalle.tipo === "Reintegro" && (
              <Stack direction="row" justifyContent="center" spacing={2}>
                <Stack width="100%" direction="column" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    Forma de pago
                  </Typography>
                  <Toolbar>{detalle.reintegro.pago}</Toolbar>
                </Stack>
                <Stack width="100%" direction="column" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    CBU
                  </Typography>
                  <Toolbar>{detalle.reintegro.cbu || "-"}</Toolbar>
                </Stack>
                <Stack width="100%" direction="column" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    Facturado A
                  </Typography>
                  <Toolbar>{detalle.reintegro.facturadoA || "-"}</Toolbar>
                </Stack>
              </Stack>
            )}
            {detalle.tipo === "Reintegro" && <Button>Ver factura</Button>}

            <Typography variant="h6" color="inherit"></Typography>
          </Stack>
        </Toolbar>
      ) : (
        <Toolbar
          sx={{
            bgcolor: "#F9F9FF",
            margin: 2,
            height: "100%",
            py: 2,
            borderRadius: 3,
          }}
        >
          <Stack
            width="100%"
            height="100%"
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              sx={{
                display: "flex",
                width: "18%",
                height: "23%",
                backgroundColor: "#F4F5FA",
                borderRadius: "50%",
                border: "solid 1px",
                borderColor: "#2E4CA6",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DescriptionIcon
                sx={{
                  width: "5vw",
                  height: "5vh",
                  color: "#2E4CA6",
                }}
              />
            </Box>
            <Typography variant="h6" color="inherit">
              Solicitudes
            </Typography>
            <Typography variant="p" color="#8B8D97">
              Haz clic en una solicitud para ver los detalles
            </Typography>
          </Stack>
        </Toolbar>
      )}
    </Stack>
  );
}
=======
import { Box, Typography, Paper, Button, Divider, Stack } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

export function DetalleSolicitud({ solicitud, onVolver }) {
  if (!solicitud) return null;

  const handleAccion = async (accion) => {
    try {
      await axios.patch(`${BACKEND_URL}/solicitudes/${solicitud._id}`, {
        estado: accion,
      });

      alert(`Solicitud ${accion.toLowerCase()} correctamente.`);
      onVolver();
    } catch (error) {
      console.error(`Error al ${accion.toLowerCase()} la solicitud:`, error);
      alert(`Error al ${accion.toLowerCase()} la solicitud.`);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        width: "100%",
        height: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F7F8FA",
      }}
    >
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={onVolver}
        sx={{ alignSelf: "flex-start", mb: 3 }}
      >
        Volver a solicitudes
      </Button>
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 3,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Detalle de la solicitud #{solicitud._id}
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2}>
            <Typography><b>Integrante:</b> {solicitud.pacienteId?.nombre || solicitud.integrante}</Typography>
            <Typography><b>Fecha:</b> {solicitud.fechaPrestacion || solicitud.fecha}</Typography>
            <Typography><b>Lugar de atención:</b> {solicitud.lugar}</Typography>
            <Typography><b>Forma de pago:</b> {solicitud.formaPago || "N/A"}</Typography>
            <Typography><b>Estado:</b> {solicitud.estado}</Typography>
            <Typography><b>Tipo:</b> {solicitud.tipo}</Typography>
            <Typography><b>Descripción:</b> {solicitud.observaciones || solicitud.descripcion}</Typography>
            <Typography><b>Importe:</b> {solicitud.importe || "—"}</Typography>
          </Stack>
        </Box>
        <Box sx={{ textAlign: "right", mt: 4 }}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="contained"
              color="success"
              onClick={() => handleAccion("Aprobada")}
            >
              Aprobar
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => handleAccion("Rechazada")}
            >
              Rechazar
            </Button>

            <Button
              variant="contained"
              color="warning"
              onClick={() => handleAccion("Observada")}
            >
              Observar
            </Button>

            <Button variant="outlined" color="primary">
              Descargar comprobante
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

>>>>>>> bab8602 (Agrego solicitudes con detallo y graficos)
