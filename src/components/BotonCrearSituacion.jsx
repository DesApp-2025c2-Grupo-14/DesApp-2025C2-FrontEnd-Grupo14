import { useState,useEffect } from "react";
import { Box, Typography, Paper, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button, } from "@mui/material";
//import situacionesData from "../data/situacionesTerapeuticas";
import { IconButton } from "@mui/material";
export function BotonCrearSituacion(setCrearSituacion) {
/*   const [items, setItems] = useState([]);

  // Al montar el componente, leemos los datos desde localStorage
  useEffect(() => {
    const storedItems = localStorage.getItem("situaciones");
    if (storedItems) {
      // Si ya hay datos guardados, los usamos
      setItems(JSON.parse(storedItems));
    } else {
      // Si no hay nada, usamos el mock inicial
      setItems(situacionesData);
      localStorage.setItem("situaciones", JSON.stringify(situacionesData));
    }
  }, []); */

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ borderRadius: 3, px: 3 }}
        onClick={setCrearSituacion}
      >
        <Typography>Crear situación</Typography>
      </Button>
    </Box>
  )
}