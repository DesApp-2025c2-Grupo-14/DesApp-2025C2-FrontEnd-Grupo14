import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function OutlinedCard({ title, value, height = 180 }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          height, // prop
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "#F9FAFB",
          boxSizing: "border-box", 
        }}
      >
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          <Typography
            sx={{ color: "text.secondary", fontSize: 14, fontWeight: 600, marginBottom:2 }}
          >
            {title?.toUpperCase() || "SIN TÍTULO"}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#2E4CA6" }}
          >
            {value ?? 0}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
