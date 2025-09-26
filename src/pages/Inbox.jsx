import React from 'react'
import { Header } from '../components/Header'
import { Listado } from '../components/Listado'
import { Box, Card, CardMedia, Grid, Stack, Typography } from "@mui/material";

export function Inbox(props) {
    console.log(props)
  return (
    <Stack
        width='100%'
    >
        <Header seccion={props.seccion} usuario={props.usuario} />
        <Stack>
            <Listado />
        </Stack>
    </Stack>
  )
}
