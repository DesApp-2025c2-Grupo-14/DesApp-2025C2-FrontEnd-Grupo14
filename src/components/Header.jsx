import React from 'react'
import { Box, Stack, Divider, AppBar, Toolbar, Typography } from "@mui/material";


export function Header(props) {
  console.log(props)
  return (
    <Toolbar 
      variant="dense"
      sx={{
          bgcolor:'#F9F9FF',
          margin: 2
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
