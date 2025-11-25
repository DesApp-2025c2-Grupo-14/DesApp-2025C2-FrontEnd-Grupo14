import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import { Menu } from "./components/Menu";
import { Login } from "./components/login";

// 🔹 Importamos el provider nuevo
import { PrestadorProvider } from "./context/PrestadorContext";


export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prestador, setPrestador] = useState(null);

  useEffect(() => {
    const savedPrestador = localStorage.getItem("prestador");
    if (savedPrestador) {
      setPrestador(JSON.parse(savedPrestador));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setPrestador(null);
    setIsLoggedIn(false);
    localStorage.removeItem("prestador");
  };

  return (
    <BrowserRouter>
      {/* 🔹 Envolvemos todo con el provider */}
      <PrestadorProvider>
        {!isLoggedIn ? (
          <Login
            onLoginSuccess={(prestadorData) => {
              setPrestador(prestadorData);
              localStorage.setItem("prestador", JSON.stringify(prestadorData));
              setIsLoggedIn(true);
            }}
          />
        ) : (
          <Stack direction="row" height="100%" width="100%">
            <Box
              width="15%"
              sx={{
                py: 4,
                bgcolor: "#021F59",
              }}
            >
              <Menu prestador={prestador} onLogout={handleLogout} />
            </Box>

            <AppRouter prestador={prestador} />
          </Stack>
        )}
      </PrestadorProvider>
    </BrowserRouter>
  );
}



