/**
 * marsApi.js — Servicio de la NASA Mars Rover Photos API.
 *
 * Centraliza:
 *  - Variables de entorno (fuente única de verdad)
 *  - Construcción de URLs para cada tipo de consulta
 *
 * Ningún componente ni hook debería leer process.env directamente.
 */

// Se utiliza la URL proxy de Nebulum para saltar los límites de rate limit de NASA
const NASA_URL = "https://rovers.nebulum.one/api/v1/rovers";
// const API_KEY  = process.env.REACT_APP_NASA_API_KEY || "DEMO_KEY";

export const marsApi = {
  /**
   * Consulta fotos por fecha solar (sol).
   * @param {string} rover   - "curiosity" | "perseverance"
   * @param {string|number} sol
   * @param {number} page
   */
  bySol: (rover, sol, page = 1) =>
    `${NASA_URL}/${rover}/photos?sol=${sol}&page=${page}`,

  /**
   * Consulta fotos por fecha terrestre (earth_date).
   * @param {string} rover   - "curiosity" | "perseverance"
   * @param {string} earthDate - formato "YYYY-MM-DD"
   * @param {number} page
   */
  byEarthDate: (rover, earthDate, page = 1) =>
    `${NASA_URL}/${rover}/photos?earth_date=${earthDate}&page=${page}`,

  /**
   * Consulta una foto específica por su ID de manera directa en el endpoint de fotos.
   * @param {string|number} id - El ID único de la fotografía
   */
  byId: (id) => `https://rovers.nebulum.one/api/v1/photos/${id}`,
};
