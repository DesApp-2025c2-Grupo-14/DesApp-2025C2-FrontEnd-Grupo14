import React from 'react'
import { Box, Stack, Divider, AppBar, Toolbar, Typography } from "@mui/material";


export function Header(props) {

  return (
    <Toolbar 
      variant="dense"
      sx={{
          bgcolor:'#F9F9FF',
          margin: 2,
          border: 2,
          borderRadius: 2
        }}
      >
      <Stack 
        direction="row" 
        width="100%" 
        justifyContent="space-between"
        
      >
        <Typography variant="h6" color="inherit">
          {props.seccion || ''}
        </Typography>
        <Typography variant="h6" color="inherit">
          {props.usuario || ''}
        </Typography>
      </Stack>
    </Toolbar>
  )
}