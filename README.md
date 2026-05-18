# 🚀 Mars App

Usuario: admin

Contraseña: 1234

Mars App es una aplicación web premium desarrollada en React que te permite explorar de manera interactiva las increíbles fotografías tomadas por los rovers de la NASA (Curiosity, Opportunity y Spirit) en la superficie de Marte.

## ✨ Características Principales

* **Exploración por Fecha Solar y Terrestre**: Filtra imágenes utilizando el sol marciano o el calendario terrestre.
* **Soporte Multilenguaje Completo (i18n)**: Traducción dinámica e instantánea entre Español (ES) e Inglés (EN) en toda la plataforma.
* **Sistema de Favoritos Dual**:
  * Guarda tus combinaciones de búsqueda exactas (Rover, Cámara, Fecha) para futuras exploraciones.
  * Marca fotografías individuales con una estrella interactiva para guardarlas en una galería privada exclusiva.
* **Diseño Premium y Glassmorphism**: Interfaz altamente estética con fondos inmersivos espaciales, modales animados de alta calidad y componentes responsivos.
* **Menú Hamburguesa Móvil (Sidebar)**: Una barra lateral de cristal desenfocado (backdrop-filter blur) fluida y adaptativa para dispositivos con pantallas menores a 900px.
* **Datos Resilientes**: Conexión a la API pública de NASA Open APIs con un fallback de datos en caso de errores de red o cuota.

## 🛠️ Tecnologías

* **React (Create React App)** - Framework Frontend principal
* **React Router Dom (v6)** - Navegación modular de la plataforma
* **Context API & Reducer** - Gestión global del estado (Autenticación y Multilenguaje)
* **CSS Modules & Variables** - Estilizado granular y tematización
* **Axios / fetch** - Conexiones a la API REST de NASA
* **Formik & Yup** - Manejo dinámico y multilenguaje de formularios y validaciones

## 🚀 Instalación y Ejecución

Sigue estos pasos para arrancar el proyecto en tu entorno local:

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura el archivo de entorno `.env` en la raíz (usa la API Key provista por la NASA y establece tu `REACT_APP_VERSION`).
4. Inicia el servidor de desarrollo local:
   ```bash
   npm start
   ```

El proyecto se levantará automáticamente en `http://localhost:3000`.

## ⚙️ Estructura del Proyecto

```text
src/
├── components/   # Componentes reutilizables (Botones, Modales, Header, Footer)
├── contexts/     # Contextos Globales (AuthContext, LanguageContext)
├── hooks/        # Custom hooks (useMarsPhotos, useFetch)
├── pages/        # Vistas completas de enrutamiento (Login, Favorites, FavoritePhotos)
├── reducers/     # Manejo de acciones y estado
└── routes/       # Centralización del enrutador de React Router
```

## 👨‍💻 Acerca de

Aplicación construida utilizando arquitectura limpia en React y optimizada meticulosamente para brindar una experiencia de usuario inmersiva de primer nivel.
