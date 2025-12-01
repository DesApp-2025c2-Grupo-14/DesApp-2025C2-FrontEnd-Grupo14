import { createContext, useState, useEffect } from "react";

export const PrestadorContext = createContext();

export const PrestadorProvider = ({ children }) => {
  const [prestador, setPrestador] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("prestador");
    if (saved) {
      const parsed = JSON.parse(saved);
      setPrestador(parsed);
    }
  }, []);

  const login = (prestadorData) => {
    setPrestador(prestadorData);
    localStorage.setItem("prestador", JSON.stringify(prestadorData));
  };

  const logout = () => {
    setPrestador(null);
    localStorage.removeItem("prestador");
  };

  return (
    <PrestadorContext.Provider
      value={{
        prestador,
        login,
        logout
      }}
    >
      {children}
    </PrestadorContext.Provider>
  );
};