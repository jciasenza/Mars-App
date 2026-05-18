/**
 * marsApi.js — Servicio de la NASA Mars Rover Photos API.
 *
 * Centraliza:
 *  - Variables de entorno (fuente única de verdad)
 *  - Construcción de URLs para cada tipo de consulta
 *
 * Ningún componente ni hook debería leer process.env directamente.
 */

const NASA_URL = process.env.REACT_APP_NASA_API_URL;
const API_KEY  = process.env.REACT_APP_NASA_API_KEY;

if (!NASA_URL || !API_KEY) {
  console.warn(
    "[marsApi] Faltan variables de entorno. Revisá el archivo .env:\n" +
    "  REACT_APP_NASA_API_URL\n  REACT_APP_NASA_API_KEY"
  );
}

export const marsApi = {
  /**
   * Consulta fotos por fecha solar (sol).
   * @param {string} rover   - "curiosity" | "spirit" | "opportunity"
   * @param {string|number} sol
   * @param {string} camera  - ej: "fhaz", "mast", "navcam"
   * @param {number} page
   */
  bySol: (rover, sol, camera, page = 1) =>
    `${NASA_URL}/${rover}/photos?sol=${sol}&camera=${camera}&page=${page}&api_key=${API_KEY}`,

  /**
   * Consulta fotos por fecha terrestre (earth_date).
   * @param {string} rover
   * @param {string} earthDate - formato "YYYY-MM-DD"
   * @param {string} camera
   * @param {number} page
   */
  byEarthDate: (rover, earthDate, camera, page = 1) =>
    `${NASA_URL}/${rover}/photos?earth_date=${earthDate}&camera=${camera}&page=${page}&api_key=${API_KEY}`,
};
