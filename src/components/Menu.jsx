import React from 'react'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Stack } from "@mui/material";
import { Nav } from "./Nav"
import { Icon } from "./Icon"
import { NavLink } from "react-router-dom";

export function Menu({ onLogout }) {
  return (
    <Stack 
      direction="column"
      height='100%'
      width='100%'
      spacing='auto'
      alignItems='center'
    >
      <NavLink 
        to="/" 
        style={{ textDecoration: "none" }}
      >
        <Icon 
          icon={<HomeRoundedIcon sx={{color:'#F2F2F2'}} fontSize="large" />} 
          color='#F2F2F2' 
          bgColor='#2E4CA6' 
          selectedColor={null} 
          label='Inicio'
        />
      </NavLink>

      <Nav items={[
        {icon:<InboxRoundedIcon sx={{color:'#F2F2F2'}}/>, label:'Bandeja de entrada', url: '/bandeja-de-entrada'},
        {icon:<ViewListRoundedIcon sx={{color:'#F2F2F2'}}/>, label:'Mis solicitudes', url: '/mis-solicitudes'},
        {icon:<PersonRoundedIcon sx={{color:'#F2F2F2'}}/>, label:'Pacientes', url: '/pacientes'},
        {icon:<CalendarMonthRoundedIcon sx={{color:'#F2F2F2'}}/>, label:'Calendario', url: '/calendario'}
      ]} />

      <Icon 
        icon={<SettingsRoundedIcon sx={{color:'#F2F2F2'}}/>} 
        color='#F2F2F2' 
        bgColor='#2E4CA6' 
        selectedColor={null} 
        label='Configuración'
      />

      {/* Logout */}
      <div onClick={onLogout} style={{ cursor: "pointer" }}>
        <Icon 
          icon={<LogoutRoundedIcon sx={{color:'#F2F2F2'}}/>} 
          color='#F2F2F2' 
          bgColor='#2E4CA6' 
          selectedColor={null} 
          label='Salir'
        />
      </div>
    </Stack>
  )
}

