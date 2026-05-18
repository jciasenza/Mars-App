import { useFetch } from "./useFetch";
import { marsApi } from "../services/marsApi";
import { mockMarsData } from "../services/mockMarsData";
import { useEffect, useState } from "react";

/**
 * useMarsPhotos — Hook personalizado para consultar la NASA Mars Rover Photos API.
 *
 * Encapsula la lógica de:
 *  - Construcción de URL (delegada a marsApi)
 *  - Fetching de datos (delegado a useFetch)
 *  - Fallback a mockMarsData en caso de error (o si la API de NASA está caída/archivada)
 *
 * @param {Object} params
 * @param {string}       params.rover      - Nombre del rover
 * @param {string|number} params.sol       - Fecha solar
 * @param {string}       params.earthDate  - Fecha terrestre YYYY-MM-DD
 * @param {string}       params.camera     - Código de cámara
 * @param {number}       params.page       - Número de página
 * @param {"sol"|"earth_date"} params.mode - Modo de consulta
 *
 * @returns {{ photos: Array, loading: boolean, error: Error|null }}
 */
export const useMarsPhotos = ({
  rover,
  sol,
  earthDate,
  camera,
  page = 1,
  mode = "sol",
}) => {
  const url =
    mode === "earth_date"
      ? marsApi.byEarthDate(rover, earthDate, camera, page)
      : marsApi.bySol(rover, sol, camera, page);

  const { data, error, loading } = useFetch(url);
  const [result, setResult] = useState({ photos: [], loading: true, error: null });

  useEffect(() => {
    // Si está cargando la API de NASA, mantenemos el loader
    if (loading) {
      setResult((prev) => ({ ...prev, loading: true }));
      return;
    }

    // Si la API de NASA responde con datos válidos, los usamos
    if (data && data.photos) {
      setResult({
        photos: data.photos,
        loading: false,
        error: null,
      });
      return;
    }

    // Si la API falla (caída/archivada) o devuelve error de red,
    // activamos la inteligencia de recuperación y servimos el fallback de alta fidelidad
    if (error || (data && !data.photos)) {
      console.warn(
        `[useMarsPhotos] NASA API falló o está inactiva. Cargando datos de respaldo históricos de Marte para ${rover} (${camera}).`
      );
      
      const mockResult = mockMarsData.getPhotos(rover, sol, earthDate, camera, page);
      
      // Simulamos una latencia mínima imperceptible para dar realismo a la interacción
      const timer = setTimeout(() => {
        setResult({
          photos: mockResult.photos,
          loading: false,
          error: null, // Evitamos bloquear la UI con el error del API de NASA
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [data, error, loading, rover, sol, earthDate, camera, page]);

  return result;
};
