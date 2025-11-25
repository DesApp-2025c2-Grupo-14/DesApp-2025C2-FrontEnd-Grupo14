import { useState, useContext, useEffect } from 'react';
import { DatosContext } from "../context/datos";
import { Box, TextField, Typography, IconButton, InputAdornment, Paper, Stack, ButtonBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useParams } from "react-router-dom";
import axios from 'axios';


export function BuscadorPacientes() {

  const { dato } = useParams(); 
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const { setDatoSeleccionado } = useContext(DatosContext);


  useEffect(() => {
    if (dato) {
      setBusqueda(dato);
      buscarPaciente(dato); // esto inicia la busqueda si viene por URL(osea del calendario)
    }
  }, [dato]);


  const buscarPaciente = async (tbusqueda) => {
    if (!tbusqueda || tbusqueda.length < 5) { 
      // evita busquedas vacias o cortas
      setResultados([]);
      setBusquedaRealizada(true);
      return;
    }

    try { 
      // este es el get para buscar pacientes 
      const res = await axios.get(`http://localhost:3000/pacientes/buscar/${tbusqueda}`)
      const { paciente, grupoFamiliar } = res.data;

      setResultados(grupoFamiliar);
      setBusquedaRealizada(true);
      setDatoSeleccionado(paciente);
      setSeleccionado(null);
      setBusqueda("");
    } catch (error) {
      console.error("Error buscando paciente:", error);
      setResultados([]);
      setBusquedaRealizada(true);
    }
  };


  /*
  // Esta era la versión vieja donde se buscaba dentro del frontend a partir de un get general
  const fetchPacientes = async () => {
    try {
      const data = await getPacientes();
      setTodosLosPacientes(data);
      const id = dato || seleccionado?._id

      // Si entramos desde /historial/:id, obtener el paciente y su grupo familiar
      if (id) {
        const pacienteActual = data.find(p => p._id === id);
        if (pacienteActual) {
          setBusqueda(pacienteActual.nroAfiliado); // muestra el nroAfiliado en el input
          const grupoBase = pacienteActual.nroAfiliado.split("-")[0];
          const grupoCompleto = data.filter(p => 
            p.nroAfiliado.startsWith(grupoBase)
          );
          setResultados(grupoCompleto);
          setBusquedaRealizada(true);
          setDatoSeleccionado(pacienteActual);
        }
      }
    } catch (error) {
      console.error("Error cargando pacientes:", error);
    }
  };
  */


  const handleSearch = (e) => {
    e.preventDefault();
    buscarPaciente(busqueda.trim());
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
        InputLabelProps={{
          sx: { fontSize: '0.8rem' }
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

      {busquedaRealizada && resultados.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No se encontraron resultados
        </Typography>
      ) : (
        <Stack spacing={2} sx={{ maxHeight: "78dvh", overflowY: "auto" }}>
          {resultados.map((paciente, i) => (
            <Paper
              component={ButtonBase}
              onClick={() => {
                setDatoSeleccionado(paciente);
                setSeleccionado(i);
              }}
              key={i}
              sx={{
                padding: 3,
                borderRadius: 6,
                border: '2px solid black',
                bgcolor: seleccionado === i ? '#0146ab' : '#F2F2F2',
                color: seleccionado === i ? 'white' : 'black'
              }}
            >
              <Stack>
                <Typography variant="h6">
                  {paciente.nombre} {paciente.apellido}
                </Typography>
                <Typography variant="body2">Parentesco: {paciente.parentesco}</Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}
