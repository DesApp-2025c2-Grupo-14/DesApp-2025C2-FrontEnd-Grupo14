import React from 'react'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
export function Menu(props) {
  const navigate = useNavigate();
  return (
    <Stack 
      direction="column"
      height='100%'
      spacing= 'auto'
      position='relative'
      alignItems='center'
    >
        <HomeRoundedIcon 
        onClick={() => navigate("/")} 
        sx={{ cursor: "pointer" }}
        />


        <Stack height='25%' spacing= 'auto'>
          <ViewListRoundedIcon />
          <InboxRoundedIcon />
          <PersonRoundedIcon 
          onClick={() => navigate("/patients")} 
          sx={{ cursor: "pointer" }}
          />
          <CalendarMonthRoundedIcon />
        </Stack>
        <SettingsRoundedIcon />
        <LogoutRoundedIcon />
    </Stack>
  )
}
