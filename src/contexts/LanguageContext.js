import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const translations = {
  es: {
    nav_inicio: "Inicio",
    nav_fecha_solar: "Fecha solar",
    nav_fecha_terrestre: "Fecha terrestre",
    nav_busquedas: "Busquedas favoritas",
    nav_fotos: "Fotos favoritas",
    nav_buscar_id: "Buscar por ID",
    nav_logout: "Logout",
    nav_acerca_de: "Acerca de",
    login_kicker: "NASA ROVER EXPLORER",
    login_title: "El planeta Marte",
    login_user: "Usuario",
    login_pass: "Password",
    login_btn: "LOGIN",
    login_error: "Usuario o contraseña incorrectos",
    login_validation_user: "El nombre de usuario es requerido",
    login_validation_pass: "La contraseña es requerida",
    banner_kicker: "NASA MARS ROVER PHOTOS",
    banner_title: "Explora Marte desde las cámaras de sus rovers",
    banner_desc: "Busca imágenes reales por rover, cámara, fecha solar o fecha terrestre y guarda tus combinaciones favoritas.",
    banner_btn_solar: "Ver por Fecha Solar",
    banner_btn_terrestre: "Ver por Fecha Terrestre",
    filter_eyebrow: "Explorador de imágenes",
    filter_title_solar: "Fotos por fecha solar",
    filter_title_terrestre: "Fotos por fecha terrestre",
    filter_desc: "Ajusta rover, cámara y fecha para consultar imágenes reales de la API de NASA Mars Rover Photos.",
    filter_select_rover: "SELECCIONA UN ROVER",
    filter_select_camera: "SELECCIONA LA CÁMARA",
    filter_select_date_solar: "SELECCIONA FECHA SOLAR",
    filter_select_date_terrestre: "SELECCIONA FECHA TERRESTRE",
    filter_save_btn: "Guardar búsqueda",
    filter_saved_btn: "Búsqueda guardada",
    gallery_results: "Resultados",
    gallery_found: "fotos encontradas",
    gallery_no_photos: "No hay fotos. Prueba otra cámara o fecha.",
    gallery_totals: "TOTAL DE FOTOS",
    buscar_id_title: "Buscar Foto por ID",
    buscar_id_placeholder: "Ingresa el ID de la foto (ej: 1026)",
    buscar_id_btn: "Buscar",
    buscar_id_not_found: "No se encontró ninguna foto con ese ID. Prueba otro.",
    fav_searches_eyebrow: "Búsquedas guardadas",
    fav_searches_title: "Búsquedas Favoritas",
    fav_searches_empty: "Sin búsquedas en favoritos",
    fav_searches_table_id: "Id",
    fav_searches_table_page: "Página",
    fav_searches_table_camera: "Cámara",
    fav_searches_table_rover: "Rover",
    fav_searches_table_earth: "Fecha Terrestre",
    fav_searches_table_solar: "Fecha Solar",
    fav_searches_table_actions: "Acciones",
    fav_photos_eyebrow: "Imágenes individuales guardadas",
    fav_photos_title: "Fotos Favoritas",
    fav_photos_empty: "No hay fotos favoritas aún. ¡Haz clic en la estrella de cualquier foto para guardarla!",
    fav_photos_results: "fotos favoritas",
    card_earth_date: "Fecha terrestre",
    card_sol: "Sol",
    card_rover: "Rover",
    card_camera: "Cámara",
    card_launch: "Lanzamiento",
    card_status: "Estado",
    card_star_remove: "Quitar de favoritas",
    card_star_add: "Marcar como favorita",
    modal_success_title: "¡Búsqueda guardada!",
    modal_success_desc: "La búsqueda fue agregada a tus favoritos.",
    modal_clear_all_title: "¿Vaciar todas las búsquedas?",
    modal_clear_all_desc: "Esta acción eliminará todas tus búsquedas guardadas. No se puede deshacer.",
    modal_delete_single_title: "¿Eliminar favorito?",
    modal_delete_single_desc: "¿Estás seguro de eliminar el favorito #",
    modal_btn_confirm: "Eliminar",
    modal_btn_cancel: "Cancelar",
    modal_btn_ok: "Entendido",
    about_title: "Acerca de Mars App",
    about_desc: "Una aplicación premium diseñada para explorar las impresionantes imágenes capturadas por los rovers de la NASA en Marte. Desarrollada con React, interactúa de forma ágil y robusta con la API de la NASA y cuenta con soporte de datos local resiliente.",
    about_version: "Versión de la aplicación",
    about_devs: "Desarrollado en colaboración con el equipo de Data from NASA APIs.",
    about_all_rights: "Todos los derechos reservados.",
    footer_desc: "Desarrollando soluciones fullstack modernas, APIs escalables y experiencias digitales de alto rendimiento.",
    footer_contact: "Contacto",
    footer_rights: "Todos los derechos reservados."
  },
  en: {
    nav_inicio: "Home",
    nav_fecha_solar: "Solar Date",
    nav_fecha_terrestre: "Earth Date",
    nav_busquedas: "Favorite Searches",
    nav_fotos: "Favorite Photos",
    nav_buscar_id: "Search by ID",
    nav_logout: "Logout",
    nav_acerca_de: "About",
    login_kicker: "NASA ROVER EXPLORER",
    login_title: "The Planet Mars",
    login_user: "Username",
    login_pass: "Password",
    login_btn: "LOGIN",
    login_error: "Incorrect username or password",
    login_validation_user: "Username is required",
    login_validation_pass: "Password is required",
    banner_kicker: "NASA MARS ROVER PHOTOS",
    banner_title: "Explore Mars through rover cameras",
    banner_desc: "Search real images by rover, camera, solar date, or Earth date and save your favorite combinations.",
    banner_btn_solar: "View by Solar Date",
    banner_btn_terrestre: "View by Earth Date",
    filter_eyebrow: "Image Explorer",
    filter_title_solar: "Photos by Solar Date",
    filter_title_terrestre: "Photos by Earth Date",
    filter_desc: "Adjust rover, camera, and date to view real images from NASA Mars Rover Photos API.",
    filter_select_rover: "SELECT A ROVER",
    filter_select_camera: "SELECT THE CAMERA",
    filter_select_date_solar: "SELECT SOLAR DATE",
    filter_select_date_terrestre: "SELECT EARTH DATE",
    filter_save_btn: "Save search",
    filter_saved_btn: "Search saved",
    gallery_results: "Results",
    gallery_found: "photos found",
    gallery_no_photos: "No photos found. Try another camera or date.",
    gallery_totals: "TOTAL PHOTOS",
    buscar_id_title: "Search Photo by ID",
    buscar_id_placeholder: "Enter photo ID (e.g. 1026)",
    buscar_id_btn: "Search",
    buscar_id_not_found: "No photo was found with that ID. Try another one.",
    fav_searches_eyebrow: "Saved Searches",
    fav_searches_title: "Favorite Searches",
    fav_searches_empty: "No saved searches in favorites",
    fav_searches_table_id: "Id",
    fav_searches_table_page: "Page",
    fav_searches_table_camera: "Camera",
    fav_searches_table_rover: "Rover",
    fav_searches_table_earth: "Earth Date",
    fav_searches_table_solar: "Solar Date",
    fav_searches_table_actions: "Actions",
    fav_photos_eyebrow: "Saved Individual Images",
    fav_photos_title: "Favorite Photos",
    fav_photos_empty: "No favorite photos yet. Click the star on any photo to save it!",
    fav_photos_results: "favorite photos",
    card_earth_date: "Earth date",
    card_sol: "Sol",
    card_rover: "Rover",
    card_camera: "Camera",
    card_launch: "Launch Date",
    card_status: "Status",
    card_star_remove: "Remove from favorites",
    card_star_add: "Mark as favorite",
    modal_success_title: "Search saved!",
    modal_success_desc: "The search was successfully added to your favorites.",
    modal_clear_all_title: "Clear all saved searches?",
    modal_clear_all_desc: "This will remove all your saved searches. This action cannot be undone.",
    modal_delete_single_title: "Delete favorite?",
    modal_delete_single_desc: "Are you sure you want to delete favorite #",
    modal_btn_confirm: "Delete",
    modal_btn_cancel: "Cancel",
    modal_btn_ok: "Got it",
    about_title: "About Mars App",
    about_desc: "A premium application designed to explore the stunning imagery captured by NASA's Mars rovers. Built with React, it interacts cleanly and robustly with the NASA API and features resilient local fallback data.",
    about_version: "App Version",
    about_devs: "Developed in collaboration with the Data from NASA APIs.",
    about_all_rights: "All rights reserved.",
    footer_desc: "Developing modern fullstack solutions, scalable APIs, and high-performance digital experiences.",
    footer_contact: "Contact",
    footer_rights: "All rights reserved."
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "es";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
