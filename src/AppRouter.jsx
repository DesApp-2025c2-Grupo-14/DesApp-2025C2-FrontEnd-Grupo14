import { Route, Routes } from "react-router-dom";
import { FilmsPage } from "./pages/FilmsPage";
// import { FilmsPage } from "./pages/FilmsPageReduxStyle";
import { ActorsPage } from "./pages/ActorsPage";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Pacientes } from "./pages/Pacientes";

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={ <Box /> } />
      <Route path='/bandeja-de-entrada' element={ <Pacientes /> } />
      <Route path='/mis-solicitudes' element={<Box />} />
      <Route path='/pacientes' element={<Box />} />
      <Route path='/calendario' element={<Box />} />
    </Routes>
  );
}