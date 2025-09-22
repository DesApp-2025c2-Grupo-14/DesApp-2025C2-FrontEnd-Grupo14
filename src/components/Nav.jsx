import { useState } from 'react'
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { Box, Stack } from "@mui/material";
import { Icon } from "./Icon"
import { Link } from "react-router-dom"
export function Nav(props) {
    const [selected, setSelected] = useState(null);

    console.log(props.items)
    return (
        <Stack height='25%' width='100%' spacing= 'auto' direction='column'  sx={{pl: 1}}>
            {props.items.map((item, index) => (
                <Box
                    key={index} 
                    width='inherit'
                >
                    <Link
                        to={item.url}
                        key={index} 
                    >
                        <Icon 
                            onClick={() => setSelected(index)}
                            key={index} 
                            icon={item.icon} 
                            color='#F2F2F2' 
                            bgColor= '#2E4CA6'
                            selectedColor= {selected === index ? '#0339A6' : null}
                            label={item.label} 
                        />
                    </Link>
                </Box>
            )
            ) }
        </Stack>
    )
}
