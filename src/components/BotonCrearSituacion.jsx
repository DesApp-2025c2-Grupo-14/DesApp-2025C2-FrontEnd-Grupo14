import { useState,useEffect } from "react";
import { Box, Typography, Paper, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button, } from "@mui/material";
import situacionesData from "../data/situacionesTerapeuticas";
import { IconButton } from "@mui/material";

export function BotonCrearSituacion() {
  const [items, setItems] = useState([]);

  // Al montar el componente, leemos los datos desde localStorage
  useEffect(() => {
    const storedItems = localStorage.getItem("productos");
    if (storedItems) {
      // Si ya hay datos guardados, los usamos
      setItems(JSON.parse(storedItems));
    } else {
      // Si no hay nada, usamos el mock inicial
      setItems(situacionesData);
      localStorage.setItem("productos", JSON.stringify(situacionesData));
    }
  }, []);

  // Función para agregar un nuevo producto
  const crearSituacion = () => {
    const situacion = {
      id: items.length + 1,nombre: `SituacionNueva`,fechaInicio : '[08/01/25]', fechaFinal : '15/07/26'
    };

    const updatedItems = [...items, situacion];

    // Actualizamos el estado y el localStorage
    setItems(updatedItems);
    localStorage.setItem("productos", JSON.stringify(updatedItems));
    //para borrar la memoria ->localStorage.removeItem("productos");
  };



  return (
    <Box>
      <Button
        variant="contained"
        sx={{ borderRadius: 3, px: 3 }}
        onClick={crearSituacion}
      >
        <Typography>Crear situación</Typography>
      </Button>

      <Box mt={2}>
        <Typography variant="subtitle2">Total de situaciones: {items.length}</Typography>
        <Typography variant="subtitle2">Total de situaciones: {JSON.stringify(items, null, 2)}</Typography>
      </Box>
    </Box>

  )
}