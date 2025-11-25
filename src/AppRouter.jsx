import { Route, Routes } from "react-router-dom";
import { Inbox } from "./pages/Inbox";
import { Pacientes } from "./pages/Pacientes";
import { Calendario } from "./pages/Calendario";
import { Solicitudes } from "./pages/Solicitudes";
import { Inicio } from "./pages/Inicio";

export function AppRouter({ prestador }) {
  return (
    <Routes>
      <Route path="/" element={<Inicio prestador={prestador} />} />

      <Route path="/bandeja-de-entrada" element={<Inbox seccion="Bandeja de entrada" prestador={prestador}/>} />
      <Route path="/mis-solicitudes" element={<Solicitudes  prestador={prestador}/>} />
      <Route path="/pacientes" element={<Pacientes vista="info" prestador={prestador}/>} />
      <Route path="/historial/:dato" element={<Pacientes vista="historial" prestador={prestador}/>} />
      <Route path="/calendario" element={<Calendario prestador={prestador}/>} />
    </Routes>
  );
}
