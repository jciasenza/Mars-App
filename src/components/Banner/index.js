import React from "react";
import "../../App.css";
import styles from "./banner.module.css";
import { Link } from "react-router-dom";
import { FiSun, FiGlobe } from "react-icons/fi";
import { useLanguage } from "../../contexts/LanguageContext";

const Banner = () => {
  const { t } = useLanguage();

  return (
    <div className="App">
      <main className={styles.banner}>
        <div className={styles.content}>
          <p>{t("banner_kicker")}</p>
          <h1>{t("banner_title")}</h1>
          <span>{t("banner_desc")}</span>
          <div className={styles.buttonGroup}>
            <Link to="/sol" className={styles.btnPrimary}>
              <FiSun /> {t("banner_btn_solar")}
            </Link>
            <Link to="/terrestre" className={styles.btnSecondary}>
              <FiGlobe /> {t("banner_btn_terrestre")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Banner;
