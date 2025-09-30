import React from 'react';
import { Box, Stack, Typography , Avatar} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from 'react';
export function Header({ seccion, usuario }) {
  seccion = "Pacientes"
  return (
    <Box
      sx={{
        bgcolor: "#ffffffff", // fondo amarillo clarito
        px: 3,
        py: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: 1,
        border: "8px solid #fae6a7e1",
      }}
    >
      <Typography variant="h6" color="text.primary">
        {seccion}
      </Typography>
      <Typography variant="h6" color="text.primary">
        {usuario}
      </Typography>
        <Avatar>
          <PersonIcon />
        </Avatar> 
    </Box>
  );
}
