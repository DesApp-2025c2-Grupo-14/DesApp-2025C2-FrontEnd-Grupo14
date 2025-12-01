import { useState } from "react";
import { Button, Dialog } from "@mui/material";
import FormularioSituacionTerapeutica from "./FormularioCrearSituacion";

// aca delego lo que anteriormente estaba en SituacionTerap
export function BotonCrearSituacion({ onGuardar }) {
  const [abierto, setAbierto] = useState(false);

  const handleGuardar = (nuevaSituacion) => {
    onGuardar(nuevaSituacion); 
    setAbierto(false); 
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ borderRadius: 3, px: 3 }}
        onClick={() => setAbierto(true)}
      >
        Crear Situación
      </Button>
      <Dialog
        open={abierto}
        onClose={() => setAbierto(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{sx: {backgroundColor: "transparent", boxShadow: "none"}}} // para que el dialogo no tenga fondo blanco ni sombra
      >
        <FormularioSituacionTerapeutica
          onGuardar={handleGuardar}
          onCancelar={() => setAbierto(false)}
        />
      </Dialog>
    </>
  );
}
