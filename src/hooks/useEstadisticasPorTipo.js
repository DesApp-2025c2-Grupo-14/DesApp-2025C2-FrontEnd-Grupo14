// hooks/useEstadisticasPorTipo.js
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

function acumularEstados(lista) {
  const acc = { pendientes: 0, enAnalisis: 0, aprobadas: 0, rechazadas: 0, observadas: 0 };
  for (const s of lista) {
    const e = String(s.estado ?? "").toLowerCase();
    if (e.includes("pendien")) acc.pendientes++;
    else if (e.includes("anal")) acc.enAnalisis++;
    else if (e.includes("aprob")) acc.aprobadas++;
    else if (e.includes("rechaz")) acc.rechazadas++;
    else if (e.includes("observ")) acc.observadas++;
  }
  return acc;
}

export function useEstadisticasPorTipo(prestadorId, tipo) {
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [raw, setRaw]         = useState([]);

  useEffect(() => {
    if (!prestadorId || !tipo) return;
    const controller = new AbortController();

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(`${BACKEND_URL}/solicitudes/mis-solicitudes`, {
          params: { id: prestadorId, tipo },
          signal: controller.signal,
        });
        setRaw(Array.isArray(data) ? data : []);
      } catch (err) {

        if (err?.response?.status === 404) {
          setRaw([]);
          setError(null);
        } else if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }

    run();
    return () => controller.abort();
  }, [prestadorId, tipo]);

  const resumen = useMemo(() => acumularEstados(raw), [raw]);
  const total = resumen.pendientes + resumen.enAnalisis + resumen.aprobadas + resumen.rechazadas + resumen.observadas;
  const isEmpty = total === 0;

  const items = useMemo(() => ([
    { title: "En análisis", value: resumen.enAnalisis },
    { title: "Aprobadas",   value: resumen.aprobadas },
    { title: "Rechazadas",  value: resumen.rechazadas },
    { title: "Observadas",  value: resumen.observadas },
  ]), [resumen]);

  // Si no hay datos, devolvemos un "dummy" para que el Pie no falle visualmente
  const pieData = useMemo(() => {
    if (isEmpty) {
      return [{ label: "Sin datos", value: 1, color: "#E0E0E0" }];
    }
    return [
      { label: "Aprobadas",   value: resumen.aprobadas,   color: "#4caf50" },
      { label: "Rechazadas",  value: resumen.rechazadas,  color: "#f44336" },
      { label: "Observadas",  value: resumen.observadas,  color: "#ff9800" },
      { label: "En análisis", value: resumen.enAnalisis,  color: "#2196f3" },
    ];
  }, [isEmpty, resumen]);

  return { loading, error, items, pieData, isEmpty };
}
