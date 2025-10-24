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
  useMediaQuery,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useTheme } from "@mui/material/styles";

const BACKEND_URL = "http://localhost:3000";
dayjs.extend(utc);
dayjs.extend(timezone);

async function getDetalle(tipo, id) {
  const response = await axios.get(`${BACKEND_URL}/solicitudes/${tipo}/${id}`);
  return Promise.resolve(response.data);
}

export function DetalleSolicitud(props) {
  const [detalle, setDetalle] = React.useState(null);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));

  React.useEffect(() => {
    if (!props.seleccion || !props.seleccion.tipo || !props.seleccion.id) {
      setDetalle(null);
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

  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      alignItems="center"
      px={isSmall ? 1 : 3}
      py={isSmall ? 1 : 2}
      spacing={2}
    >
      <Header seccion={props.solicitud} usuario="" />

      {detalle && detalle.tipo ? (
        <Toolbar
          sx={{
            bgcolor: "#F9F9FF",
            width: "100%",
            maxWidth: 900,
            flexGrow: 1,
            margin: isSmall ? 1 : 2,
            py: isSmall ? 1.5 : 2.5,
            px: isSmall ? 1.5 : 3,
            borderRadius: 3,
            flexDirection: "column",
            alignItems: "stretch",
            overflowY: "auto",
          }}
        >
          <Stack
            direction="column"
            spacing={isSmall ? 2 : 3}
            width="100%"
            alignItems="stretch"
          >
            {/* FECHA Y LUGAR */}
            <Stack
              direction={isSmall ? "column" : "row"}
              justifyContent="space-between"
              alignItems={isSmall ? "flex-start" : "center"}
              spacing={isSmall ? 2 : 0}
            >
              <Stack direction="column" alignItems="center" flex={1}>
                <Typography variant="h6">Fecha</Typography>
                <Typography variant="body1">
                  {(detalle.fechaPrestacion &&
                    dayjs(detalle.fechaPrestacion)
                      .tz("America/Argentina/Buenos_Aires")
                      .format("DD/MM/YYYY HH:mm")) ||
                    "--/--/---- --:--"}
                </Typography>
              </Stack>

              <Stack direction="column" alignItems="center" flex={1}>
                <Typography variant="h6">Lugar de atención</Typography>
                <Typography variant="body1">
                  {detalle.lugar || "Sin especificar"}
                </Typography>
              </Stack>
            </Stack>

            {/* PACIENTE */}
            <Stack width="100%" direction="column" alignItems="center">
              <Typography variant="h6">Paciente</Typography>
              <Typography variant="body1">
                {detalle.paciente?.nombre || "-"}
              </Typography>
            </Stack>

            {/* DETALLES SEGÚN TIPO */}
            {detalle.tipo === "Receta" ? (
              <Stack
                direction={isSmall ? "column" : "row"}
                justifyContent="space-between"
                spacing={isSmall ? 2 : 0}
              >
                <Stack direction="column" alignItems="center" flex={1}>
                  <Typography variant="h6">Medicamento</Typography>
                  <Typography variant="body1">
                    {detalle.receta.medicamento}
                  </Typography>
                </Stack>
                <Stack direction="column" alignItems="center" flex={1}>
                  <Typography variant="h6">Cantidad</Typography>
                  <Typography variant="body1">
                    {detalle.receta.cantidad}
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <Stack
                direction={isSmall ? "column" : "row"}
                justifyContent="space-between"
                spacing={isSmall ? 2 : 0}
              >
                <Stack direction="column" alignItems="center" flex={1}>
                  <Typography variant="h6">Médico</Typography>
                  <Typography variant="body1">{detalle.medico}</Typography>
                </Stack>
                <Stack direction="column" alignItems="center" flex={1}>
                  <Typography variant="h6">Especialidad</Typography>
                  <Typography variant="body1">
                    {detalle.especialidad}
                  </Typography>
                </Stack>
              </Stack>
            )}

            {/* CAMPOS EXTRA SEGÚN TIPO */}
            {detalle.tipo === "Autorizacion" && (
              <Stack width="100%" direction="column" alignItems="center">
                <Typography variant="h6">Días de internación</Typography>
                <Typography variant="body1">
                  {detalle.autorizacion.diasInternacion}
                </Typography>
              </Stack>
            )}

            {detalle.tipo === "Receta" && (
              <Stack width="100%" direction="column" alignItems="center">
                <Typography variant="h6">Presentación</Typography>
                <Typography variant="body1">
                  {detalle.receta.presentacion}
                </Typography>
              </Stack>
            )}

            {/* OBSERVACIONES */}
            <Stack>
              <Typography variant="h6">Observaciones</Typography>
              <Box
                sx={{
                  height: isSmall ? "20vh" : "15vh",
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

            {/* REINTEGRO */}
            {detalle.tipo === "Reintegro" && (
              <>
                <Stack
                  direction={isSmall ? "column" : "row"}
                  justifyContent="center"
                  alignItems="center"
                  spacing={isSmall ? 2 : 3}
                >
                  <Stack direction="column" alignItems="center" flex={1}>
                    <Typography variant="h6">Forma de pago</Typography>
                    <Typography variant="body1">
                      {detalle.reintegro.pago}
                    </Typography>
                  </Stack>
                  <Stack direction="column" alignItems="center" flex={1}>
                    <Typography variant="h6">CBU</Typography>
                    <Typography variant="body1">
                      {detalle.reintegro.cbu || "-"}
                    </Typography>
                  </Stack>
                  <Stack direction="column" alignItems="center" flex={1}>
                    <Typography variant="h6">Facturado A</Typography>
                    <Typography variant="body1">
                      {detalle.reintegro.facturadoA || "-"}
                    </Typography>
                  </Stack>
                </Stack>
                <Button
                  variant="contained"
                  sx={{
                    alignSelf: "center",
                    bgcolor: "#2E4CA6",
                    "&:hover": { bgcolor: "#1e3574" },
                    width: isSmall ? "100%" : "auto",
                  }}
                >
                  Ver factura
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      ) : (
        // --- Vista vacía / sin selección ---
        <Toolbar
          sx={{
            bgcolor: "#F9F9FF",
            width: "100%",
            maxWidth: 800,
            margin: isSmall ? 1 : 2,
            height: "100%",
            py: 3,
            borderRadius: 3,
          }}
        >
          <Stack
            width="100%"
            height="100%"
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Box
              sx={{
                display: "flex",
                width: isSmall ? "35vw" : "18%",
                height: isSmall ? "20vw" : "23%",
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
                  width: isSmall ? "10vw" : "5vw",
                  height: isSmall ? "10vw" : "5vh",
                  color: "#2E4CA6",
                }}
              />
            </Box>
            <Typography variant={isSmall ? "h6" : "h5"}>Solicitudes</Typography>
            <Typography
              variant="body2"
              color="#8B8D97"
              textAlign="center"
              px={isSmall ? 2 : 0}
            >
              Haz clic en una solicitud para ver los detalles
            </Typography>
          </Stack>
        </Toolbar>
      )}
    </Stack>
  );
}
