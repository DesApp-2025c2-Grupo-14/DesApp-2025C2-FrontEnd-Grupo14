import React from 'react'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Stack } from "@mui/material";
export function Menu(props) {
  return (
    <Stack 
      direction="column"
      height='100%'
      spacing= 'auto'
      position='relative'
      alignItems='center'
    >
        <HomeRoundedIcon />


        <Stack height='25%' spacing= 'auto'>
          <ViewListRoundedIcon />
          <InboxRoundedIcon />
          <PersonRoundedIcon />
          <CalendarMonthRoundedIcon />
        </Stack>
        <SettingsRoundedIcon />
        <LogoutRoundedIcon />
    </Stack>
  )
}
