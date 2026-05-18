/**
 * mockMarsData.js — Datos históricos y fotos de respaldo (fallback) para Mars-App.
 *
 * Dado que la API oficial de Mars Rover Photos de la NASA (api.nasa.gov/mars-photos)
 * fue discontinuada y archivada permanentemente en 2025/2026, este archivo sirve
 * como un dataset estático e interactivo de fotos de alta calidad para garantizar
 * que la aplicación sea 100% funcional, interactiva y robusta.
 */

const ROVER_METADATA = {
  curiosity: {
    id: 5,
    name: "Curiosity",
    landing_date: "2012-08-06",
    launch_date: "2011-11-26",
    status: "active",
  },
  spirit: {
    id: 7,
    name: "Spirit",
    landing_date: "2004-01-04",
    launch_date: "2003-06-10",
    status: "complete",
  },
  opportunity: {
    id: 6,
    name: "Opportunity",
    landing_date: "2004-01-25",
    launch_date: "2003-07-07",
    status: "complete",
  },
};

const CAMERAS = {
  fhaz: "Front Hazard Avoidance Camera",
  rhaz: "Rear Hazard Avoidance Camera",
  mast: "Mast Camera",
  chemcam: "Chemistry and Camera Complex",
  mahli: "Mars Hand Lens Imager",
  mardi: "Mars Descent Imager",
  navcam: "Navigation Camera",
  pancam: "Panoramic Camera",
  minites: "Miniature Thermal Emission Spectrometer (Mini-TES)",
};

// Fotos reales de Marte con URLs de alta confiabilidad (Wikimedia Commons y NASA)
const MARS_PHOTOS_POOL = [
  {
    id: 102681,
    img_src: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Curiosity_Self-Portrait_at_Martian_Sand_Dune_recipe.jpg",
    caption: "Self-portrait of Curiosity rover at Namib Dune",
  },
  {
    id: 102682,
    img_src: "https://upload.wikimedia.org/wikipedia/commons/d/d8/NASA_Mars_Rover.jpg",
    caption: "Artist's concept of Spirit / Opportunity rover on Mars",
  },
  {
    id: 102683,
    img_src: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    caption: "True color view of Mars from OSIRIS instrument",
  },
  {
    id: 102684,
    img_src: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Mars_Curiosity_Rover_Sol_24_Panorama.jpg",
    caption: "Curiosity Rover Sol 24 Panorama landscape",
  },
  {
    id: 102685,
    img_src: "https://upload.wikimedia.org/wikipedia/commons/1/10/Spirit_Self-Portrait_at_Husband_Hill.jpg",
    caption: "Spirit Rover self-portrait at Husband Hill",
  },
  {
    id: 102686,
    img_src: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Opportunity_self_portrait_sol_180.jpg",
    caption: "Opportunity rover self-portrait on Sol 180",
  },
  {
    id: 102687,
    img_src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Mars_surface_Spirit_Rover.jpg",
    caption: "Martian horizon captured by Spirit Rover",
  },
  {
    id: 102688,
    img_src: "https://upload.wikimedia.org/wikipedia/commons/1/16/Opportunity_rover_tracks_on_Mars.jpg",
    caption: "Tracks left by Opportunity rover on the Martian soil",
  },
];

export const mockMarsData = {
  /**
   * Genera un listado de fotos filtrado y formateado a partir de los criterios de búsqueda.
   * @param {string} rover
   * @param {string|number} sol
   * @param {string} earthDate
   * @param {string} camera
   * @param {number} page
   * @returns {{ photos: Array }}
   */
  getPhotos: (rover, sol, earthDate, camera, page = 1) => {
    const roverName = rover.toLowerCase();
    const roverMeta = ROVER_METADATA[roverName] || ROVER_METADATA.curiosity;
    const cameraName = camera.toLowerCase();
    const cameraFullName = CAMERAS[cameraName] || "Unknown Camera";

    // Mapeo estable para que cada rover/cámara/fecha devuelva fotos consistentes
    // pero con suficiente variedad dinámica para simular un fetch real.
    const seed = (roverName.charCodeAt(0) + (sol ? parseInt(sol, 10) : 0) + cameraName.charCodeAt(0)) % MARS_PHOTOS_POOL.length;

    // Generar un set de 4 fotos barajando el pool
    const selectedPhotos = [];
    for (let i = 0; i < 4; i++) {
      const idx = (seed + i) % MARS_PHOTOS_POOL.length;
      const basePhoto = MARS_PHOTOS_POOL[idx];
      selectedPhotos.push({
        id: basePhoto.id + i * 100 + (parseInt(sol, 10) || 0),
        sol: sol ? parseInt(sol, 10) : 1,
        earth_date: earthDate || "2015-01-01",
        img_src: basePhoto.img_src,
        camera: {
          id: 20 + i,
          name: cameraName.toUpperCase(),
          rover_id: roverMeta.id,
          full_name: cameraFullName,
        },
        rover: {
          ...roverMeta,
        },
      });
    }

    return { photos: selectedPhotos };
  },
};
