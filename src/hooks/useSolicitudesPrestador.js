import { useState, useEffect } from "react";
import axios from "axios";

// 🔹 Este hook trae las solicitudes del prestador desde el backend
export const useSolicitudesPrestador = (prestadorId, tipo = null) => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSolicitudes = async () => {
        try {
        setLoading(true);
        const url = tipo
            ? `http://localhost:3000/prestadores/${prestadorId}/solicitudes?tipo=${tipo}`
            : `http://localhost:3000/prestadores/${prestadorId}/solicitudes`;
        const response = await axios.get(url);
        setSolicitudes(response.data);
        setError(null);
        } catch (err) {
        console.error("Error cargando solicitudes del prestador:", err);
        setError(err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        if (prestadorId) fetchSolicitudes();
    }, [prestadorId, tipo]);

    return { solicitudes, loading, error, refetch: fetchSolicitudes };
};

// Estadisticas para grafico y tabla
export const useEstadisticasPorTipo = (prestadorId, tipo) => {
    const [items, setItems] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);

    const fetchEstadisticas = async () => {
        if (!prestadorId || !tipo) return;
        try {
        setLoading(true);
        const response = await axios.get(
            `http://localhost:3000/prestadores/${prestadorId}/solicitudes?tipo=${tipo}`
        );

        const solicitudes = response.data || [];

      // Agrupacion por estado de solicitud
        const agrupadas = solicitudes.reduce((acc, s) => {
            const estado = s.estado || "Sin estado";
            acc[estado] = (acc[estado] || 0) + 1;
            return acc;
        }, {});
        const resumen = Object.entries(agrupadas).map(([estado, cantidad]) => ({
            title: estado,
            value: cantidad,
        }));
        const colorMap = {
        Aprobada: "#4CAF50",      
        Rechazada: "#F44336",      
        Observada: "#FFB74D",      
        "En análisis": "#64B5F6",  
        "Sin estado": "#BDBDBD",   
        };
        const chartData = Object.entries(agrupadas).map(([estado, cantidad]) => ({
            id: estado,
            value: cantidad,
            label: estado,
            color: colorMap[estado] || "#CCCCCC",
        }));

        setItems(resumen);
        setPieData(chartData);
        setIsEmpty(chartData.length === 0);
        } catch (err) {
        console.error("Error cargando estadísticas por tipo:", err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchEstadisticas();
    }, [prestadorId, tipo]);

    return { items, pieData, loading, isEmpty, refetch: fetchEstadisticas };
};



