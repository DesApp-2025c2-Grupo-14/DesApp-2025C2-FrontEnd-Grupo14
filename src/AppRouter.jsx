import { Routes, Route } from "react-router-dom";
import { FilmsPage } from "./pages/FilmsPage";
import PatientsPage from "./pages/PatientsPage"

export function AppRouter() {
  return (
    <Routes>
      <Route path="/films" element={<FilmsPage />} />
      <Route path="/patients" element={<PatientsPage />} />
    </Routes>
  );
}
