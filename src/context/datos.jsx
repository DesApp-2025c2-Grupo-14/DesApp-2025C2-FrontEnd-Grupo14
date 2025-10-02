import { createContext, useState } from "react";

export const DatosContext = createContext();

export const DatosProvider = ({ children }) => {
  const [datoSeleccionado, setDatoSeleccionado] = useState(false);

  return (
    <DatosContext.Provider value={{ datoSeleccionado, setDatoSeleccionado }}>
      {children}
    </DatosContext.Provider>
  );
};