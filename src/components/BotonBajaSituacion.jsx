import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";

export function BotonBajaSituacion({ onBorrado }) {
  const [abierto, setAbierto] = useState(false);
  // llamo a la funcion borrar pasada por props y cierro el dialogo
  const handleBorrado = () => {
    onBorrado();
    setAbierto(false); 
  };

  return (
    <>
      <Button color="error" onClick={() => setAbierto(true)}>
        Dar de baja
      </Button>
      <Dialog
        open={abierto}
        onClose={() => setAbierto(false)}
      >
        <DialogTitle>Confirmar dar de baja</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que querés dar de baja la situación terapéutica?
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAbierto(false)}>
            Cancelar
          </Button>
          {/* aca uso la funcion de borrado del padre*/}
          <Button onClick={handleBorrado} color="error" variant="contained">
            Dar de baja
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
