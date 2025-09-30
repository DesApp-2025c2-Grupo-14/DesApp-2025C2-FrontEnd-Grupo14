import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export default function PatientCard({ patient, onSelect, selected }) {
  return (
    <ListItemButton
      selected={selected}
      onClick={() => onSelect(patient)}
      sx={{ borderRadius: 2, mb: 1 , alignItems:"self-end"}}
    >
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText 
        primary={patient.name} 
        secondary={patient.role} 
      />
    </ListItemButton>
  );
}
