import { useState, useContext } from 'react';
import { DatosContext } from "../context/datos";
import { Box, TextField, Typography, IconButton, InputAdornment, Paper, Stack, ButtonBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import pacientes from '../data/pacientes';

export function BuscadorPacientes({ onPacienteSeleccionado }) {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const { setDatoSeleccionado } = useContext(DatosContext);

  const handleSearch = (e) => {
    e.preventDefault();
    const textoBusqueda = busqueda.trim();
    setBusquedaRealizada(true);

    if (textoBusqueda === "" || textoBusqueda.length < 5) {
      setResultados([]);
      return;
    }

    const pacientesFiltrados = pacientes.filter((paciente) => {
      return (
        paciente.dni.startsWith(textoBusqueda) ||
        paciente.telefono.startsWith(textoBusqueda) ||
        paciente.nroAfiliado.startsWith(textoBusqueda)
      );
    });

    const grupos = new Map();

    pacientesFiltrados.forEach((paciente) => {
      const grupoBase = paciente.nroAfiliado.split("-")[0];
      if (!grupos.has(grupoBase)) {
        const grupoCompleto = pacientes.filter((p) =>
          p.nroAfiliado.startsWith(grupoBase)
        );
        grupos.set(grupoBase, grupoCompleto);
      }
    });

    const resultadosUnicos = [];
    grupos.forEach((grupo) => {
      grupo.forEach((paciente) => {
        if (
          !resultadosUnicos.some((p) => p.nroAfiliado === paciente.nroAfiliado)
        ) {
          resultadosUnicos.push(paciente);
        }
      });
    });

    setResultados(resultadosUnicos);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        label="Ingrese DNI/nroAfiliado/teléfono"
        variant="outlined"
        size="small"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        //sx={{ input: { color: 'white' } }}
        InputLabelProps={{
          sx: { fontSize: '0.8rem'}
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton type="submit" aria-label="buscar" edge="start" onClick={() => setDatoSeleccionado("")}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      {busquedaRealizada && resultados.length === 0 ? (
        <Typography variant="body2" color="text.secondary">No se encontraron resultados</Typography>
      ) : (
        <Stack spacing={2} sx={{ maxHeight: "78dvh", overflowY: "auto" }}>
          {resultados.map((paciente, i) => (
            <Paper
              component={ButtonBase}
              onClick={() => {
                setDatoSeleccionado(paciente);
                setSeleccionado(i);
                if (onPacienteSeleccionado) onPacienteSeleccionado();
              }}
              key={i}
              sx={{
                padding: 3,
                borderRadius: 6,
                border: '2px solid black',
                bgcolor: seleccionado === i ? '#0146ab' : '#F2F2F2'
              }}
            >
              <Stack>
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
