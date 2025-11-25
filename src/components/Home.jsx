import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";

export function Home() {
    const { usuario, logout } = useContext(AuthContext);

    return (
        <div>
            <h1>Bienvenido {usuario.nombre}</h1>
            <Button variant="contained" onClick={logout}>Cerrar sesión</Button>
        </div>
    );
}
