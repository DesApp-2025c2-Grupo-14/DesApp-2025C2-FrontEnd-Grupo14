import { Route, Routes } from "react-router-dom";
import { FilmsPage } from "./pages/FilmsPage";
// import { FilmsPage } from "./pages/FilmsPageReduxStyle";
import { Inbox } from "./pages/Inbox";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={ <Inbox seccion='Bandeja de entrada' usuario='Pepe Argento' /> } />
      <Route path='/bandeja-de-entrada' element={ <Inbox seccion='Bandeja de entrada' usuario='Pepe Argento'/> } />
      <Route path='/mis-solicitudes' element={<Box />} />
      <Route path='/pacientes' element={<Box />} />
      <Route path='/calendario' element={<Box />} />
    </Routes>
  );
}