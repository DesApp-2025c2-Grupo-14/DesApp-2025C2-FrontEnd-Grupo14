import React from "react";
import {PieChart,Pie,Cell,ResponsiveContainer,Legend,Tooltip} from "recharts";
import { Typography, Box } from "@mui/material";

export function KpiChart({ data }) {
    const COLORS = ["#E0A800","#2E4CA6" ,"#C62828","#616161"];

    return (
        <Box
        sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 1,
        }}
        >
        <Typography
            variant="subtitle1"
            sx={{ mb: 1.5, fontWeight: 600, textAlign: "center" }}
        >
            Estado de Reintegros
        </Typography>
        <Box sx={{ width: "90%", height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                data={data}
                dataKey="valor"
                nameKey="titulo"
                innerRadius={60}
                outerRadius={80} 
                paddingAngle={3}
                >
                {data.map((entry, index) => (
                    <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    />
                ))}
                </Pie>
                <Tooltip />
                <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: "0.85rem" }}
                />
            </PieChart>
            </ResponsiveContainer>
        </Box>
        </Box>
    );
}





