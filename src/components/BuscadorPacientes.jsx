import { useState,useContext  } from 'react';
import { DatosContext } from "../context/datos";
import { Box, TextField, Typography, IconButton, InputAdornment, Paper, Stack, ButtonBase} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { blue, red } from '@mui/material/colors';

const pacientesMock = [
  { dni: '43048790', nombre: 'Fausto', apellido: 'Nuñez', nroAfiliado: '00001-01', telefono: '1234567890', parentesco: 'Titular' },
  { dni: '48409451', nombre: 'Juan', apellido: 'Lopez', nroAfiliado: '00001-02', telefono: '1234567880', parentesco: 'Hermano' },
  { dni: '45902987', nombre: 'Julian', apellido: 'Nuñez', nroAfiliado: '00001-03', telefono: '1234567451', parentesco: 'Hermano' },
  { dni: '45902987', nombre: 'Juliana', apellido: 'Nuñez', nroAfiliado: '00001-04', telefono: '1234567451', parentesco: 'Hermano' },
  { dni: '45902987', nombre: 'Julian', apellido: 'Nuñez', nroAfiliado: '00001-05', telefono: '1234567451', parentesco: 'Hermano' },
  { dni: '45902987', nombre: 'Damian', apellido: 'Gutierrez', nroAfiliado: '00001-06', telefono: '1234567451', parentesco: 'Hermano' },
  { dni: '56789012', nombre: 'Ana', apellido: 'Martinez', nroAfiliado: '00002-01', telefono: '1234567000', parentesco: 'Titular' },
];

export function BuscadorPacientes() {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  
  const { setDatoSeleccionado } = useContext(DatosContext);

  const handleSearch = (e) => {
    e.preventDefault();
    setBusquedaRealizada(true);
    const texto = busqueda.toLowerCase();

    const pacientesFiltrados = pacientesMock.filter(paciente => {
      return (
        paciente.dni.includes(texto) ||
        paciente.telefono.includes(texto)  ||
        paciente.nroAfiliado.includes(texto)
      );
    });

    const grupos = new Map();

    pacientesFiltrados.forEach(paciente => {
      const grupoBase = paciente.nroAfiliado.split('-')[0];
      if (!grupos.has(grupoBase)) {
        const grupoCompleto = pacientesMock.filter(p => p.nroAfiliado.startsWith(grupoBase));
        grupos.set(grupoBase, grupoCompleto);
      }
    });

    const resultadosUnicos = [];
    grupos.forEach(grupo => {
      grupo.forEach(paciente => {
        if (!resultadosUnicos.some(p => p.nroAfiliado === paciente.nroAfiliado)) {
          resultadosUnicos.push(paciente);
        }
      });
    });

    setResultados(resultadosUnicos);
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', flexDirection: 'column', gap: 2,  }}>
      <TextField
        label="Ingrese DNI/nroAfiliado/teléfono"
        variant="outlined"
        size="small"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        InputLabelProps={{
          sx: { fontSize: '0.8rem'}
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton type="submit" aria-label="buscar" edge="start">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      {busquedaRealizada && resultados.length === 0  ? (
        <Typography variant="body2" color="text.secondary">No se encontraron resultados</Typography>
      ) : (
        <Stack spacing={2}  sx={{maxHeight:"78dvh",overflowY: "auto"}}>
          {resultados.map((paciente, i) => (
            <Paper component={ButtonBase} onClick={() => {setDatoSeleccionado(paciente),setSeleccionado(i)}} key={i} sx={{ padding: 3, borderRadius: 6,border: '2px solid black',bgcolor: seleccionado===i? 'red':'brown'}}>
              <Stack >
                <Typography variant="h6">{paciente.nombre} {paciente.apellido}</Typography>
                <Typography variant="body2">Parentesco: {paciente.parentesco}</Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}