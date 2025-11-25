import { useState, useContext } from "react";
import { InfoPaciente } from "./InfoPaciente";
import { HistoriaClinica } from "./HistoriaClinica";
import { SituacionTerapeutica } from "./SituacionTerap"; 
import { DatosContext } from "../context/datos";

export function InfoContainer(props) {
  const [vista, setVista] = useState(props.vista);
  const { datoSeleccionado } = useContext(DatosContext);

  return (
    <>
      {vista === "info" && (
        <InfoPaciente
          onAbrirHistoria ={() => setVista("historial")}
          onAbrirSituacion ={() => setVista("situacion")}
        />
      )}

      {vista === "historial" && (
        <HistoriaClinica
          datoSeleccionado={datoSeleccionado}
          prestador={props.prestador}
          onCerrarHistoria={() => setVista("info")}
        />
      )}

      {vista === "situacion" && (
        <SituacionTerapeutica
          datoSeleccionado={datoSeleccionado}
          onCerrarSituacion={() => setVista("info")}
        />
      )}
    </>
  );
}
