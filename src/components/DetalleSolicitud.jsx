import React from "react";
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
  const response = await axios.get(
    `${BACKEND_URL}/solicitudes/detalle/${tipo}/${id}`
  );
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

    fetchDetalle();
  }, [props.seleccion]);
  console.log("props.seleccion en Detalle:", props.seleccion);

  return (
    <Stack
      direction="column"
      width="80%"
      height="100%"
      alignItems="space-between"
    >
      <Header seccion={props.solicitud} usuario=""/>
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
                  <Typography variant="h5" color="inherit" sx={{ mb: 2 }}>
                    Fecha
                  </Typography>
                  <Toolbar variant="body2" color="inherit">
                    <Typography sx={{ fontSize: "1.2rem", color: "black", borderRadius: 1, p: 1 }}>
                    {(detalle.fechaPrestacion &&
                      dayjs(detalle.fechaPrestacion)
                        .tz("America/Argentina/Buenos_Aires")
                        .format("DD/MM/YYYY HH:mm")) ||
                      "--/--/---- --:--"}
                    </Typography>
                  </Toolbar>
                </Stack>
                <Stack direction="column" alignItems="center">
                  <Typography variant="h5" color="inherit" sx={{ mb: 2 }}>
                    Lugar de atención
                  </Typography>
                  <Toolbar>
                    <Typography sx={{ fontSize: "1.2rem", color: "black", borderRadius: 1, p: 1 }}>
                    {detalle.lugar || "Sin especificar"}
                    </Typography>
                  </Toolbar>
                </Stack>
              </Stack>
            }
            <Stack width="100%" direction="column" alignItems="center">
              <Typography variant="h5" color="inherit" sx={{ mb: 2 }}>
                Paciente
              </Typography>
              <Toolbar>
                <Typography sx={{ fontSize: "1.2rem", color: "black", borderRadius: 1, p: 1 }}>
                  {detalle.paciente.nombre + " " + detalle.paciente.apellido}
                </Typography>
              </Toolbar>
            </Stack>

            {detalle.tipo === "Receta" ? (
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="column" alignItems="center">
                  <Typography variant="h5" color="inherit" sx={{ mb: 2 }}>
                    Medicamento
                  </Typography>
                  <Toolbar><Typography sx={{ fontSize: "1.2rem", color: "black", borderRadius: 1, p: 1 }}>{detalle.receta.medicamento}</Typography></Toolbar>
                </Stack>
                <Stack direction="column" alignItems="center">
                  <Typography variant="h5" color="inherit" sx={{ mb: 2 }}>
                    Cantidad
                  </Typography>
                  <Toolbar><Typography sx={{ fontSize: "1.2rem", color: "black", borderRadius: 1, p: 1 }}>{detalle.receta.cantidad}</Typography></Toolbar>
                </Stack>
              </Stack>
            ) : (
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="column" alignItems="center">
                  <Typography variant="h5" color="inherit">
                    Médico
                  </Typography>
                  <Toolbar><Typography sx={{ fontSize: "1.2rem", color: "black", borderRadius: 1, p: 1 }}>{detalle.medico || "Sin asignar"}</Typography></Toolbar>
                </Stack>
                <Stack direction="column" alignItems="center">
                  <Typography variant="h5" color="inherit" sx={{ mb: 2 }}>
                    Especialidad
                  </Typography>
                  <Toolbar><Typography sx={{ fontSize: "1.2rem", color: "black", borderRadius: 1, p: 1 }}>{detalle.especialidad}</Typography></Toolbar>
                </Stack>
              </Stack>
            )}

            {detalle.tipo === "Autorizacion" && (
              <Stack width="100%" direction="column" alignItems="center">
                <Typography variant="h5" color="inherit" sx={{ mb: 2 }}>
                  Dias de internación
                </Typography>
                <Toolbar><Typography sx={{ fontSize: "1.2rem", color: "black", borderRadius: 1, p: 1 }}>{detalle.autorizacion.diasInternacion}</Typography></Toolbar>
              </Stack>
            )}

            {detalle.tipo === "Receta" && (
              <Stack width="100%" direction="column" alignItems="center">
                <Typography variant="h5" color="inherit" sx={{ mb: 2 }}>
                  Presentación
                </Typography>
                <Toolbar><Typography sx={{ fontSize: "1.2rem", color: "black", borderRadius: 1, p: 1 }}>{detalle.receta.presentacion}</Typography></Toolbar>
              </Stack>
            )}


            {detalle.tipo === "Reintegro" && (

                <Stack width="100%" direction="column" alignItems="center">
                  <Typography variant="h5" color="inherit" sx={{ mb: 2 }}>
                    Forma de pago
                  </Typography>
                  <Toolbar><Typography sx={{ fontSize: "1.2rem", color: "black", borderRadius: 1, p: 1 }}>{detalle.reintegro.pago}</Typography></Toolbar>
                </Stack>

            )}

            {detalle.tipo === "Reintegro" && (
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="column" alignItems="center">
                  <Typography variant="h5" color="inherit" sx={{ mb: 2 }}>
                    CBU
                  </Typography>
                  <Toolbar><Typography sx={{ fontSize: "1.2rem", color: "black", borderRadius: 1, p: 1 }}>{detalle.reintegro.cbu}</Typography></Toolbar>
                </Stack>
                <Stack direction="column" alignItems="center">
                  <Typography variant="h5" color="inherit" sx={{ mb: 2 }}>
                    Facturado A
                  </Typography>
                  <Toolbar><Typography sx={{ fontSize: "1.2rem", color: "black", borderRadius: 1, p: 1 }}>{detalle.reintegro.facturadoA}</Typography></Toolbar>
                </Stack>
              </Stack>
            )}
            <Stack>
              <Typography variant="h5" color="inherit" sx={{ mb: 2 }}>
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
                  <Typography sx={{ fontSize: "1.2rem", color: "White", borderRadius: 1, p: 1 }}>{detalle.observaciones || "Sin observaciones."}</Typography>
                </Typography>
              </Box>
            </Stack>
            {detalle.tipo === "Reintegro" && <Button>Ver factura</Button>}

            <Typography variant="h5" color="inherit" sx={{ mb: 2 }}></Typography>
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
