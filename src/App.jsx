import { BrowserRouter } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import { AppRouter } from "./AppRouter";
import { Menu } from "./components/Menu";
import { Header } from "./components/Header";

export function App() {
  return (
    <BrowserRouter>
      <Stack direction="row" height="100vh" width="100%">
        <Box
          sx={{
            width: "70px",
            bgcolor: "#ffffff",
            borderRight: "8px solid #fae6a7e1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 2,
          }}
        >
          <Menu />
        </Box>

        <Stack direction="column" flex={1}>

          {/* Contenido debajo del header */}
          <Box flex={1} p={2} bgcolor="#fff">
            <AppRouter />
          </Box>
        </Stack>
      </Stack>
    </BrowserRouter>
  );
}
