import React, { useState } from "react";
import "../../App.css";
import { Link, useLocation } from "react-router-dom";
import styles from "../../NavBar.module.css";
import logo from "../../image/logo.png";
import { useAuth } from "../../contexts/Auth";
import { useLanguage } from "../../contexts/LanguageContext";
import { FiMenu, FiX, FiGlobe, FiInfo } from "react-icons/fi";
import Modal from "../Modal/Modal";

function Header() {
  const { state, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  // Si no está logueado o estamos en la pantalla de login (o root) explícitamente, ocultar el Header
  if (!state.isLoggedIn || location.pathname === "/login" || location.pathname === "/") {
    return null;
  }

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Fondo oscuro para el menú hamburguesa */}
      {menuOpen && <div className={styles.menuOverlay} onClick={closeMenu}></div>}

      <header className={styles.navbar}>
        <div className={styles.navContent}>
          <Link to="/inicio" className={styles.brand} onClick={closeMenu}>
            <img src={logo} className="logo" alt="Mars App" />
            <span>Mars App</span>
          </Link>

          {/* Botón de hamburguesa mobile */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            type="button"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
          {/* Navegación y Enlaces */}
          <nav
            className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}
            aria-label="Navegación principal"
          >
            <Link to="/inicio" onClick={closeMenu}>
              {t("nav_inicio")}
            </Link>
            <Link to="/sol" onClick={closeMenu}>
              {t("nav_fecha_solar")}
            </Link>
            <Link to="/terrestre" onClick={closeMenu}>
              {t("nav_fecha_terrestre")}
            </Link>
            <Link to="/favorites" onClick={closeMenu}>
              {t("nav_busquedas")}
            </Link>
            <Link to="/favorite-photos" onClick={closeMenu}>
              {t("nav_fotos")}
            </Link>
            <Link to="/buscar-id" onClick={closeMenu}>
              {t("nav_buscar_id")}
            </Link>

            {/* Botón Acerca de */}
            <button
              onClick={() => {
                setAboutOpen(true);
                closeMenu();
              }}
              className={styles.aboutBtn}
              type="button"
            >
              <FiInfo />
              {t("nav_acerca_de")}
            </button>

            {/* Selector de idioma */}
            <button
              onClick={toggleLanguage}
              className={styles.langBtn}
              type="button"
            >
              <FiGlobe />
              {language.toUpperCase()}
            </button>

            <Link
              to="/login"
              className={styles.logout}
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              {t("nav_logout")}
            </Link>
          </nav>
        </div>
      </header>

      <Modal
        isOpen={aboutOpen}
        type="info"
        title={t("about_title")}
        message={`${t("about_desc")}\n\n${t("about_version")}: ${process.env.REACT_APP_VERSION || "v1.0.0"}\n\n${t("about_devs")}`}
        confirmText={t("modal_btn_ok")}
        onConfirm={() => setAboutOpen(false)}
      />
    </>
  );
}

export default Header;
