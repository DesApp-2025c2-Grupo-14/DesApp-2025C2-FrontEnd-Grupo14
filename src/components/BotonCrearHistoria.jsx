import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";

export function BotonCrearHistoria({ onGuardar }) {
  const [abierto, setAbierto] = useState(false);
  // llamo a la funcion borrar pasada por props y cierro el dialogo
  const handleCrear = () => {
    onGuardar();
    setAbierto(false); 
  };

  return (
    <>
      <Button sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              px: 4,
              "&:hover": {
                backgroundColor: "#125a9c",
              },
            }}onClick={() => setAbierto(true)}>
        Guardar
      </Button>
      <Dialog
        open={abierto}
        onClose={() => setAbierto(false)}
      >
        <DialogTitle>Confirmar Nota</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que querés guardar esta nota?
            Una vez guardada no se podra eliminar
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAbierto(false)}>
            Cancelar
          </Button>
          <Button onClick={handleCrear} color="primary" variant="contained">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
