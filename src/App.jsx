import { useState, useEffect, useContext } from "react";
import { Box, Stack } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import { Menu } from "./components/Menu";
import { Login } from "./components/login";

// 🔹 Importamos el provider nuevo
import { PrestadorProvider, PrestadorContext } from "./context/PrestadorContext";


export function App() {
  return (
    <BrowserRouter>
      <PrestadorProvider>
        <Contenido />
      </PrestadorProvider>
    </BrowserRouter>
  );
}

function Contenido() {
  const { prestador, login, logout } = useContext(PrestadorContext);

  const isLoggedIn = !!prestador;

  return !isLoggedIn ? (
    <Login onLoginSuccess={login} />
  ) : (
    <Stack direction="row" height="100%" width="100%">
      <Box width="15%" sx={{ py: 4, bgcolor: "#021F59" }}>
        <Menu prestador={prestador} onLogout={logout} />
      </Box>
      <AppRouter prestador={prestador} />
    </Stack>
  );
}



