// hooks/useEstadisticasPorTipo.js
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

function normalizar(data = {}) {
  const total = Number(data.total) || 0;
  const aprobadas = Number(data.aprobadas) || 0;
  const rechazadas = Number(data.rechazadas) || 0;
  const observadas = Number(data.observadas) || 0;
  const enAnalisis = Math.max(0, total - aprobadas - rechazadas - observadas);
  return { total, aprobadas, rechazadas, observadas, enAnalisis };
}

export function useEstadisticasPorTipo(prestadorId, tipo, reloadKey = false) {
  const [stats, setStats] = useState(normalizar());

  const fetchStats = () => {
    if (!prestadorId || !tipo) {
      setStats(normalizar());
      return;
    }

    axios
      .get(`${BACKEND_URL}/solicitudes/dashboard`, { params: { prestadorId, tipo } })
      .then((res) => setStats(normalizar(res.data)))
      .catch(() => setStats(normalizar()));
  };

  useEffect(fetchStats, [prestadorId, tipo, reloadKey]); // 👈 se ejecuta cuando cambia reloadKey

  const isEmpty =
    !stats.total &&
    !stats.aprobadas &&
    !stats.rechazadas &&
    !stats.observadas &&
    !stats.enAnalisis;

  const items = useMemo(
    () => [
      { title: "En análisis", value: stats.enAnalisis },
      { title: "Aprobadas", value: stats.aprobadas },
      { title: "Rechazadas", value: stats.rechazadas },
      { title: "Observadas", value: stats.observadas },
    ],
    [stats]
  );

  const pieData = useMemo(() => {
    if (isEmpty) {
      return [{ label: "Sin datos", value: 1, color: "#E0E0E0" }];
    }
    return [
      { label: "Aprobadas", value: stats.aprobadas, color: "#4caf50" },
      { label: "Rechazadas", value: stats.rechazadas, color: "#f44336" },
      { label: "Observadas", value: stats.observadas, color: "#ff9800" },
      { label: "En análisis", value: stats.enAnalisis, color: "#2196f3" },
    ];
  }, [stats, isEmpty]);

  return { items, pieData, stats, isEmpty, refetch: fetchStats };
}
