import { List } from "@mui/material";
import PatientCard from "./PatiendCard";

export default function PatientList({ patients, onSelect, selectedPatient }) {
  return (
    <List>
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          onSelect={onSelect}
          selected={selectedPatient?.id === patient.id}
        />
      ))}
    </List>
  );
}
