import React from 'react'
import { Box, Stack, Divider, AppBar, Toolbar, Typography } from "@mui/material";


export function Header(props) {
  return (
    <AppBar>
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div">
          {props.seccion}
        </Typography>
        <Typography variant="h6" color="inherit" component="div">
          {props.usuario} 
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
