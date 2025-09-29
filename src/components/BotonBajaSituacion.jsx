import { Button } from "@mui/material";

export function BotonBajaSituacion({ historia, onBorrado }) {
  const borrarHistoria = () => {
    //recupera las historias o sino usa un array vacio
    const historiasGuardadas = JSON.parse(localStorage.getItem("historias")) || [];

    //filtra las historias para eliminar la que coincide con el id de la historia pasada por props
    const nuevasHistorias = historiasGuardadas.filter(
      (h) => h.id !== historia.id
    );

    // actualiza la lista de historias sin la historia eliminada
    localStorage.setItem("historias", JSON.stringify(nuevasHistorias));

    if (onBorrado) {
      onBorrado(nuevasHistorias);
    }
  };

  return (
    // boton de borrado
    <Button color="error" onClick={borrarHistoria}>
      Borrar Historia
    </Button>
  );
}
