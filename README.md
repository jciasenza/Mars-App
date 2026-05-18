# 🚀 Mars App

**Usuario de Demostración:** `admin`  
**Contraseña:** `1234`  

Mars App es una aplicación web premium responsiva desarrollada en **React** que permite a los usuarios explorar e interactuar de forma inmersiva con fotografías reales tomadas en la superficie de Marte por los rovers de la NASA (**Curiosity** y **Perseverance**) mediante una integración fluida con la API de **Nebulum**.

---

## ✨ Características Principales

*   **Integración con Nebulum API**: Consultas en tiempo real y sin necesidad de API Keys para obtener datos actualizados de los rovers Curiosity y Perseverance.
*   **Visor de Pantalla Completa (Lightbox Premium)**: Haz clic en cualquier imagen para abrir un modal elegante con efecto de desenfoque de fondo (*Glassmorphism*), transición suave de zoom, y detalles técnicos completos de la captura (Rover, Sol marciano, Fecha Terrestre y Cámara).
*   **Micro-Interacciones e Interfaz Estética**: Tarjetas de fotos con efecto de zoom sutil al pasar el cursor y cursor de lupa (`zoom-in`) para mejorar el dinamismo del sitio.
*   **Paginación Inteligente en el Cliente (Frontend Slicing)**:
    *   La paginación agrupa los resultados automáticamente en lotes de **exactamente 8 fotos por página**.
    *   Soporte dinámico para números de páginas completas (ej: `[1, 2, 3]`).
    *   Se oculta de forma inteligente si la búsqueda devuelve 8 o menos fotos.
    *   Disponible tanto para las vistas de búsqueda principales como para la galería de **Fotos Favoritas** y la tabla de **Búsquedas Guardadas**.
    *   UX Premium: Auto-corrección de página activa hacia atrás si eliminas un elemento y la página actual se queda vacía.
*   **Sistema de Favoritos Dual**:
    *   **Búsquedas Guardadas**: Almacena combinaciones de filtros de búsqueda para volver a consultarlas al instante con paginación integrada.
    *   **Fotos Favoritas**: Marca fotos individuales con una estrella interactiva para visualizarlas en tu propia galería privada.
*   **Soporte Multilenguaje Completo (i18n)**: Traducción dinámica en tiempo real entre Español (ES) e Inglés (EN) en toda la aplicación.
*   **Menú Hamburguesa Móvil (Sidebar)**: Menú de navegación móvil responsivo y estilizado para pantallas de menos de 900px con fondo translúcido y desenfoque.
*   **Resiliencia y Datos de Respaldo**: Fallback automático a datos históricos de Marte en caso de caídas de red o fallas en el servidor de la API.

---

## 🛠️ Tecnologías

*   **React (Create React App)** - Librería Frontend principal.
*   **React Router Dom (v6)** - Navegación e inyección de parámetros en URL.
*   **Context API & Reducer** - Gestión global del estado (Autenticación y Multilenguaje).
*   **CSS Modules & Variables** - Estilizado granular encapsulado y consistencia temática.
*   **Axios & Fetch** - Consumo de endpoints REST de la API Nebulum.
*   **Formik & Yup** - Gestión de formularios, validaciones robustas y localización.
*   **React Icons & React Bootstrap** - Componentes de interfaz de usuario y set de iconos estilizados.

---

## 🚀 Instalación y Ejecución

Sigue estos sencillos pasos para arrancar el proyecto en tu entorno local:

1.  **Clona el repositorio** en tu máquina local.
2.  **Instala las dependencias**:
    ```bash
    npm install
    ```
3.  **Inicia el servidor de desarrollo local**:
    ```bash
    npm start
    ```
4.  Abre tu navegador en `http://localhost:3000` para iniciar la exploración espacial.

---

## ⚙️ Estructura del Proyecto

```text
src/
├── actions/      # Acciones para el estado global (ej: Auth)
├── components/   # Componentes modulares reutilizables (Header, Footer, Pagination, Visor, Selects)
├── contexts/     # Gestión global de contextos (AuthContext, LanguageContext)
├── hooks/        # Custom hooks centralizados (useMarsPhotos, useFetch)
├── image/        # Assets y fondos inmersivos de la aplicación
├── pages/        # Vistas de enrutamiento (Login, Favorites, FavoritePhotos)
├── reducers/     # Reductores de estado global
├── routes/       # Rutas del aplicativo (React Router Dom)
└── services/     # Servicios y mocks de datos (marsApi, mockMarsData)
```

---

## 👨‍💻 Acerca de

Aplicación construida utilizando arquitectura limpia en React y optimizada meticulosamente para brindar una experiencia de usuario de primer nivel.
