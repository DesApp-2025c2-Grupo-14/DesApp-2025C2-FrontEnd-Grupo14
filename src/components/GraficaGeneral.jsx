// src/components/GraficaReintegros.jsx
import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#2E4CA6", "#E57373", "#FFD54F", "#616161"];

export default function GraficaReintegros({ prestadorId }) {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
        const res = await fetch(`http://localhost:3000/reintegros/estadisticas/${prestadorId}`);
        const json = await res.json();
        setData(json);
        } catch (err) {
        console.error("Error al obtener datos de reintegros:", err);
        }
    };

    useEffect(() => {
        if (!prestadorId) return;
        fetchData(); // Carga de la base de datos
        const interval = setInterval(fetchData, 10000); // Actualizcion cada 10 segundos
        return () => clearInterval(interval);
    }, [prestadorId]);

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


