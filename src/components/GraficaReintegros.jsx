// src/components/GraficaReintegros.jsx
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#2E4CA6", "#E57373", "#FFD54F", "#616161"];

export default function GraficaReintegros({ data }) {
    return (
        <Card sx={{ p: 2, borderRadius: 3 }}>
        <Typography variant="h6" textAlign="center" mb={2}>
            Estado de Reintegros
        </Typography>
        <CardContent>
            <Box sx={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                <Pie
                    data={data}
                    dataKey="valor"
                    nameKey="titulo"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend />
                </PieChart>
            </ResponsiveContainer>
            </Box>
        </CardContent>
        </Card>
  );
}

