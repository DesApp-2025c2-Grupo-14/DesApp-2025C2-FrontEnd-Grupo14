import { createContext, useState } from "react";

export const PrestadorContext = createContext();

export const PrestadorProvider = ({ children }) => {
    const [prestadorCentroSeleccionado, setPrestadorCentroSeleccionado] = useState(null);

    return (
        <PrestadorContext.Provider value={{ prestadorCentroSeleccionado, setPrestadorCentroSeleccionado }}>
            {children}
        </PrestadorContext.Provider>
    );
};
