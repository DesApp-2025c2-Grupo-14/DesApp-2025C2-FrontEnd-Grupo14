import { useState } from 'react'
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { Box, Stack } from "@mui/material";
import { Icon } from "./Icon"
export function Nav(props) {
    const [selected, setSelected] = useState(null);


    return (
        <Stack height='25%' width='100%' spacing= 'auto' direction='column' alignItems='center'>
            {props.items.map((item, index) => (
                <Icon 
                    onClick={() => setSelected(index)}
                    key={index} 
                    icon={item.icon} 
                    color='#F2F2F2' 
                    bgColor= '#2E4CA6'
                    selectedColor= {selected === index ? '#0339A6' : null}
                    label={item.label} 
                />
            )
            ) }
        </Stack>
    )
}
