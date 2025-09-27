import  { useContext } from 'react';
import {DatosContext} from '../context/datos'
import { Box, TextField, Typography, IconButton,Chip,Stack,Button} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BoySharp } from '@mui/icons-material';

export function InfoContainer() {
  const{datoSeleccionado} = useContext(DatosContext);

  return (
    <Stack m={3} sx={{alignContent : "center",height:'100%'}}>
      {!datoSeleccionado ?(
        <Box sx={{alignContent:'center',height: '100%'}}>
            <Stack sx={{alignItems : 'center'}}>
              <Box fontSize={100}>
                <AccountCircleIcon fontSize= 'inherit'></AccountCircleIcon>
              </Box>
              <Typography>Pacientes</Typography>
              <Typography>Seleccione un cliente para ver mas informacion</Typography>
            </Stack>




        </Box>):(
        <Stack justifyContent={'space-evenly'} height='100%' width='100%' bgcolor='grey' borderRadius={3}>
          <Stack direction={'column'} alignItems={'center'}>
            <Stack px={3} width={200} textAlign={'center'}>
              <Typography px={5}>Integrante</Typography>
              <Box bgcolor='white' borderRadius={5}>
                <Typography>{datoSeleccionado.nombre} {datoSeleccionado.apellido}</Typography> 
              </Box>
            </Stack > 
          </Stack>
          <Stack direction={'row'} justifyContent="space-evenly">
            <Stack px={3} width={200} textAlign={'center'}>
              <Typography px={5}>parentesco</Typography>
              <Box bgcolor='white' borderRadius={5}>
                <Typography>{datoSeleccionado.parentesco}</Typography>
              </Box>
            </Stack >
            <Stack px={3} width={200} textAlign={'center'}>
              <Typography px={5}>dni</Typography>
              <Box bgcolor='white' borderRadius={5}>
                <Typography>{datoSeleccionado.dni}</Typography>
              </Box>
            </Stack >
          </Stack>
          <Stack direction={'row'} justifyContent="space-evenly">
            <Stack px={3} width={200} textAlign={'center'}>
              <Typography px={5}>Documento</Typography>
              <Box bgcolor='white' borderRadius={5}>
                <Typography>{datoSeleccionado.dni}</Typography>
              </Box>
            </Stack >
            <Stack px={3} width={200} textAlign={'center'}>
              <Typography px={5}>Mail</Typography>
              <Box bgcolor='white' borderRadius={5}>
                <Typography>{datoSeleccionado.nroAfiliado}</Typography>
              </Box>
            </Stack >
          </Stack>
          <Stack direction={'row'} justifyContent="space-evenly">
            <Stack px={3} width={200} textAlign={'center'}>
              <Typography px={5}>PlanMedico</Typography>
              <Box bgcolor='white' borderRadius={5}>
                <Typography>PlanMedico</Typography>
              </Box>
            </Stack >
            <Stack px={3} width={200} textAlign={'center'}>
              <Typography>telefono</Typography>
              <Box bgcolor='white' borderRadius={5}>
                <Typography>{datoSeleccionado.telefono}</Typography>
              </Box>
            </Stack >
          </Stack>
          <Stack direction={'row'} justifyContent="space-evenly">
            <Button variant='contained'>
              <Typography>Historial clinico</Typography>
            </Button>
              <Button variant='contained'>
                <Typography>Situaciones terapeuticas</Typography>
              </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}