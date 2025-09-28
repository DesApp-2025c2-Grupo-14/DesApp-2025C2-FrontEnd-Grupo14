import { useState, useContext } from "react";
import { InfoPaciente } from "./InfoPaciente";
import { HistoriaClinica } from "./HistoriaClinica";
import { DatosContext } from "../context/datos";
export function InfoContainer() {
  const [mostrarHistorial, setMostrarHistoria] = useState(false);
  const { datoSeleccionado } = useContext(DatosContext);
  return (
    <>
      {!mostrarHistorial ? (
        <InfoPaciente onAbrirHistoria={() => setMostrarHistoria(true)} />
      ) : (
         <HistoriaClinica
          datoSeleccionado={datoSeleccionado}
          onCerrarHistoria={() => setMostrarHistoria(false)}
        />
      )}
    </>
  );
}
