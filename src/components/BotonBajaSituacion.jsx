import { Button } from "@mui/material";

export function BotonBajaSituacion({ situacion, onBorrado }) {
  const borrarSituacion = () => {
    //recupera las historias o sino usa un array vacio
    const situacionesGuardadas = JSON.parse(localStorage.getItem("situaciones")) || [];

    //filtra las Situaciones para eliminar la que coincide con el id de la historia pasada por props
    const nuevasSituaciones = situacionesGuardadas.filter(
      (s) => s.id !== situacion.id
    );

    // actualiza la lista de Situaciones sin la historia eliminada
    localStorage.setItem("situaciones", JSON.stringify(nuevasSituaciones));

    if (onBorrado) {
      onBorrado(nuevasSituaciones);
    }
  };

  return (
    // boton de borrado
    <Button color="error" onClick={borrarSituacion}>
      Borrar Situacion
    </Button>
  );
}
