import { Route, Routes } from "react-router-dom";
import { Inbox } from "./pages/Inbox";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Pacientes } from "./pages/Pacientes";
import { Calendario } from "./pages/Calendario";
import { Solicitudes } from "./pages/Solicitudes";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Inbox seccion="Bandeja de entrada" usuario="Pepe Argento" />}/>
      <Route path="/bandeja-de-entrada" element={<Inbox seccion="Bandeja de entrada" usuario="Pepe Argento" />}/>
      <Route path="/mis-solicitudes" element={<Solicitudes />} />
      <Route path="/pacientes" element={<Pacientes />} />
      <Route path="/calendario" element={<Calendario />} />
    </Routes>
  );
}
