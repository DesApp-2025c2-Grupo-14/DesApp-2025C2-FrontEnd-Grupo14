import {useState} from 'react'
import { Box, Stack, Typography, Button } from "@mui/material"

export function Icon(props) {
  const [hover, setHover] = useState(false)
  let bgColor = hover ? props.bgColor : 'none'
  let mouseType = hover ? 'pointer' : 'default' 
  return (
    <Box 
      sx={

            {
              bgcolor: props.selectedColor ?? bgColor,
              borderRadius: 1,
              px: 1, 
              py: 1,
              cursor: mouseType 
            }
          }
          width='90%'
          onMouseEnter={()=> setHover(true)}
          onMouseLeave={()=> setHover(false)}
          onClick={props.onClick} 
    >

      <Stack
        direction='row'
        alignItems='center'
        spacing='10px'
        width='100%'
      >
        {props.icon}
        <Typography style={{color: props.color}}>
          {props.label}  
        </Typography> 
      </Stack>
    </Box>                    
  )
}
