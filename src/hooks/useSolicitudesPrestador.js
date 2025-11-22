import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PrestadorContext } from "../context/PrestadorContext";

export const useSolicitudesPrestador = (prestadorIdProp, tipo = null, rango) => {
    const { prestadorCentroSeleccionado } = useContext(PrestadorContext);

    // ⬇️ prioridad: prestador individual → prestador de centro
    const prestadorId = prestadorIdProp || prestadorCentroSeleccionado?._id;

    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSolicitudes = async () => {
        if (!prestadorId) return;

        try {
            setLoading(true);
            const url = `http://localhost:3000/solicitudes/mis-solicitudes`;

            const response = await axios.get(url, {
                params: {
                    id: prestadorId,
                    tipo,
                    desde: rango[0].toISOString(),
                    hasta: rango[1].toISOString(),
                }
            });

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
    }, [prestadorId, tipo, rango]);

    return { solicitudes, loading, error, refetch: fetchSolicitudes };
};





