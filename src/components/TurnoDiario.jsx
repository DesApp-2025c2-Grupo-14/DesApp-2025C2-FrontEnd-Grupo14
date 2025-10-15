import { Box, Stack, Typography } from "@mui/material";

export function TurnoDiario() {
  return(
    <Box>
      <Stack direction= "row">
        <Box
                sx={{
                  width: 15,
                  height: 15,
                  borderRadius: "100%",
                  bgcolor: "green",
                  marginTop:"5px"
                }}></Box>
        <Box sx={{marginInline :"10px"}}>
          <Typography >8:00 - 9:00</Typography>
          <Typography variant="h6">Solis, Eduardo</Typography>
        </Box>
      </Stack>
    </Box>
  )  
}