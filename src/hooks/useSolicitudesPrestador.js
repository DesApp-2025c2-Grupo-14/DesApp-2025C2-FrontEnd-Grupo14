import { useEffect, useState } from "react";
import axios from "axios";

export const useSolicitudesPrestador = (prestadorId) => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!prestadorId) return;

        const fetchSolicitudes = async () => {
        try {
            const response = await axios.get(
            `http://localhost:3000/prestadores/${prestadorId}/solicitudes`
            );
            setSolicitudes(response.data);
        } catch (err) {
            console.error("Error al obtener solicitudes:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
        };

        fetchSolicitudes();
    }, [prestadorId]);

    return { solicitudes, loading, error };
};
