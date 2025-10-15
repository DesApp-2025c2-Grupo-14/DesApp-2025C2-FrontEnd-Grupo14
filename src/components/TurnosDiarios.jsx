import { Stack, Box, Typography} from "@mui/material";
import { TurnoDiario } from "../components/TurnoDiario";

export function TurnosDiarios() {
  return (
    <Stack>
      <Box>
        <Typography>Hoy</Typography>
      </Box>

      <Stack spacing={2} sx={{ maxHeight: "45dvh", overflowY: "auto" }}>
        <TurnoDiario/>
        <TurnoDiario/>
        <TurnoDiario/>
      </Stack>
    </Stack>
  );
}
