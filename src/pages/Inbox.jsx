import React from 'react'
import { Header } from '../components/Header'
import { Listado } from '../components/Listado'
import { DetalleSolicitud } from '../components/DetalleSolicitud'
import { Box, Card, CardMedia, Grid, Stack, Typography } from "@mui/material";

export function Inbox(props) {
    console.log(props)
  return (
    <Stack
        width='100%'
        height='100%'
        
    >
        <Header seccion={props.seccion} usuario={props.usuario} />
        <Stack direction='row' width='100%' height='100%' spacing='auto'>
            <Listado />
            <DetalleSolicitud solicitud = 'Reintegro #1' tipo = {0} />
        </Stack>
    </Stack>
  )
}

import React from 'react'
import { Header } from '../components/Header'
import { Listado } from '../components/Listado'
import { DetalleSolicitud } from '../components/DetalleSolicitud'
import { Box, Card, CardMedia, Grid, Stack, Typography } from "@mui/material";

export function Inbox(props) {
    console.log(props)
  return (
    <Stack width="100%" height="100vh"> {/* usar 100vh para asegurar altura total */}
      <Header seccion={props.seccion} usuario={props.usuario} />

      <Stack
        direction="row"
        width="100%"
        height="100%"
      >
        <Listado />
        <DetalleSolicitud solicitud="" tipo={null} />
      </Stack>
    </Stack>
  )
}
