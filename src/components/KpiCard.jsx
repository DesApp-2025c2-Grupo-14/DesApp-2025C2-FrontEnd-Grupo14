import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export function KpiCard({ title, value, color }) {
    return (
        <Card
            sx={{
                backgroundColor: color,
                color: "white",
                borderRadius: 2,
                boxShadow: 3,
                width: "100%",
                maxWidth: 180,
                height: 45, 
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.03)" },
            }}
            >
            <CardContent
                sx={{
                p: 1, 
                "&:last-child": { pb: 1 },
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: "bold",
                    fontSize: "0.95rem",
                    mb: 0.5,
                    lineHeight: 1.2, 
                }}
                >
                {title}
                </Typography>
                <Typography
                variant="h5"
                sx={{
                    fontWeight: "bold",
                    fontSize: "1.6rem",
                    lineHeight: 1.2,
                }}
                >
                {value}
                </Typography>
            </CardContent>
            </Card>
        );
}



