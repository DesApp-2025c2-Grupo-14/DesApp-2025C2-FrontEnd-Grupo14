import { useState } from "react";

const mockPatients = [
  { id: 1, name: "Abril Lozano Silva", role: "Titular", birthDate: "17-3-1993", document:37553007, email:"lucasdroege@gmail.com", plan:"ahora 12", phone:113341232},
  { id: 2, name: "Julián Herrera López", role: "Cónyuge" , birthDate: "12-4-2010", document:37007, email:"lucase@gmail.com", plan:"Cabify", phone:11357311112},
  { id: 3, name: "Tomás Calderón Paredes", role: "Hijo" , birthDate: "22-7-1976", document:35595007, email:"oege@gmail.com", plan:"Marzo2025", phone:11332131532},
  { id: 4, name: "Lucía Peña Carrasco", role: "Cónyuge" , birthDate: "23-11-1963", document:38192587, email:"luge@gmail.com", plan:"Sube", phone:1135532},
];

export default function usePatients() {
  const [patients] = useState(mockPatients);
  const [filteredPatients, setFilteredPatients] = useState(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const searchPatient = (query) => {
    if (!query) {
      setFilteredPatients(patients);
      return;
    }

    const lowerQuery = query.toLowerCase();
    setFilteredPatients(
      patients.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.role.toLowerCase().includes(lowerQuery)
      )
    );
  };

  const selectPatient = (patient) => {
    setSelectedPatient(patient);
  };

  return {
    patients,
    filteredPatients,
    selectedPatient,
    searchPatient,
    selectPatient,
  };
}
