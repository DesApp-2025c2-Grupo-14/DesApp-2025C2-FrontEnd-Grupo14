import React from 'react'
import { Header } from './Header'
import { Box, Stack, Divider, AppBar, Toolbar, Typography, Button, Drawer } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
export function DetalleSolicitud(props) {

    return (
        <Stack 
            direction='column' 
            width='80%' 
            height='100%' 
            alignItems='space-between'
        >
            <Header seccion={props.solicitud} usuario = '' />
            {props.tipo !== null ? <Toolbar
                sx={{
                    bgcolor:'#F9F9FF',
                    margin: 2,
                    height: '100%',
                    py: 2,
                    borderRadius:3
                    }}
                
            >   
                <Stack 
                    direction='column' 
                    width='100%' 
                    height='100%' 
                    justifyContent='center'
                    spacing='auto'
                    sx={
                        {
                            mx: 2
                        }
                    }
                >
                    
                    {<Stack direction='row' justifyContent='space-between'>
                        <Stack direction='column' alignItems='center'> 
                            <Typography variant="h6" color="inherit">
                                Fecha
                            </Typography>
                            <Toolbar>
                                1 de Enero de 2026
                            </Toolbar>
                        </Stack>
                        <Stack direction='column' alignItems='center'>
                            <Typography variant="h6" color="inherit">
                                Lugar de atención
                            </Typography>
                            <Toolbar>
                                Sanatorio Guemes
                            </Toolbar>
                        </Stack>
                    </Stack>}
                    <Stack width='100%' direction='column' alignItems='center'>
                        <Typography variant="h6" color="inherit">
                            Paciente
                        </Typography>
                        <Toolbar>
                                Pepe Argento
                        </Toolbar>
                    </Stack>
                    
                    {
                        props.tipo === 2 ?  
                            <Stack direction='row' justifyContent='space-between'>
                                <Stack direction='column' alignItems='center'>
                                    <Typography variant="h6" color="inherit">
                                        Medicamento
                                    </Typography>
                                    <Toolbar>
                                        Sanatorio Guemes
                                    </Toolbar>
                                </Stack>
                                <Stack direction='column' alignItems='center'>
                                    <Typography variant="h6" color="inherit">
                                        Cantidad
                                    </Typography>
                                    <Toolbar>
                                        Sanatorio Guemes
                                    </Toolbar>
                                </Stack>
                            </Stack>
                                :
                            <Stack direction='row' justifyContent='space-between'>
                                <Stack direction='column' alignItems='center'>
                                    <Typography variant="h6" color="inherit">
                                        Médico
                                    </Typography>
                                    <Toolbar>
                                        Dr Dardo
                                    </Toolbar>
                                </Stack>
                                <Stack direction='column' alignItems='center'>
                                    <Typography variant="h6" color="inherit">
                                        Especialidad
                                    </Typography>
                                    <Toolbar>
                                        Urología
                                    </Toolbar>
                                </Stack>
                            </Stack>
                    }
                        
                    
                    {
                        props.tipo === 1 &&
                        <Stack width='100%' direction='column' alignItems='center'>
                            <Typography variant="h6" color="inherit">
                                Dias de internación
                            </Typography>
                            <Toolbar>
                                10 días
                            </Toolbar>
                        </Stack>                    
                    }
                    
                    {
                        props.tipo === 2 &&
                        <Stack width='100%' direction='column' alignItems='center'>
                            <Typography variant="h6" color="inherit">
                                Presentación
        
                            </Typography>
                            <Toolbar>
                                Urología
                            </Toolbar>
                        </Stack>
                    }
                    <Stack>
                        <Typography variant="h6" color="inherit">
                            Observaciones
                        </Typography>
                        <Box
                            sx={{
                                height: "15vh",
                                bgcolor: "#2E4CA6",
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                overflowY: "auto",
                            }}
                            >
                            <Typography
                                variant="body2"
                                color="#F9F9FF"
                                sx={{
                                    whiteSpace: "pre-wrap",     
                                    overflowWrap: "break-word", 
                                    wordBreak: "break-word",
                                 
                                }}
                            >
                                {"Hermosa mañana verdad" || "Sin observaciones."}
                            </Typography>
                            </Box>
                    </Stack>
                    {
                        props.tipo === 0 &&
                        <Stack width='100%' direction='column' alignItems='center'>
                            <Typography variant="h6" color="inherit">
                                Forma de pago
                            </Typography>
                            <Toolbar>
                                Tarjeta
                            </Toolbar>
                        </Stack>
                    }
                    {
                        props.tipo === 0 &&
                        <Button>
                            Ver factura
                        </Button>
                    }

                    <Typography variant="h6" color="inherit">
                        
                    </Typography>
                </Stack>
            </Toolbar>
            :
            <Toolbar
                sx={{
                    bgcolor:'#F9F9FF',
                    margin: 2,
                    height: '100%',
                    py: 2,
                    borderRadius:3
                    }}
                
            >    
                <Stack
                   width='100%' height='100%'direction='column' alignItems='center' justifyContent='center'
                >
                    <Box
                        sx={
                            {
                                display: 'flex',
                                width: '18%',
                                height: '23%',
                                backgroundColor: "#F4F5FA",
                                borderRadius: '50%',
                                border: 'solid 1px',
                                borderColor: '#2E4CA6',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }
                        }
                    >
                        <DescriptionIcon 
                            sx={{
                                width: '5vw',
                                height: '5vh',
                                color: '#2E4CA6'
                            }}
                        />
                    </Box>
                    <Typography variant="h6" color="inherit">
                        Solicitudes
                    </Typography>
                    <Typography variant="p" color="#8B8D97">
                        Haz clic en una solicitud para ver los detalles
                    </Typography>
                </Stack>
            </Toolbar>
             }
        </Stack>
    )
}
