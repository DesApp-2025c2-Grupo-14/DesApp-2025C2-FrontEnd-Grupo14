import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function PatientSearch({ onSearch }) {
  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Ingrese teléfono / Número Afiliado / Apellido"
      onChange={(e) => onSearch(e.target.value)}
      sx={{ mb: 2 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
