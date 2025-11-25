import React from 'react'
import { Header } from '../components/Header'
import { Listado } from '../components/Listado'
import { DetalleSolicitud } from '../components/DetalleSolicitud'
import { Box, Card, CardMedia, Grid, Stack, Typography } from "@mui/material";

export function Inbox(props) {
  const [seleccion, setSeleccion] = React.useState(null);
  console.log(seleccion)
  const handleSeleccion = (tipo, id) => {
    setSeleccion({ tipo, id });
  };
  console.log("seleccion en Inbox:", seleccion);
  return (
    <Stack width="100%" height="100vh">
      <Header seccion={props.seccion} usuario={props.prestador.nombre} />

      <Stack
        direction="row"
        width="100%"
        height="100%"
      >
        <Listado onSeleccionar={handleSeleccion} />
        <DetalleSolicitud seleccion={seleccion} solicitud="" tipo={null} />
      </Stack>
    </Stack>
  )
}
