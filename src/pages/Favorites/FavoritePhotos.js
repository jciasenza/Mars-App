import React from "react";
import "../../App.css";
import styles from "./fondo.module.css";
import Photos from "../../components/Photos/Photos";
import { useLanguage } from "../../contexts/LanguageContext";

const FavoritePhotos = () => {
  const { t } = useLanguage();

  return (
    <div className="App">
      <main className="main-shell">
        <div className={styles.fondo}>
          <div className={styles.title} style={{ marginBottom: "30px" }}>
            <div>
              <p className="eyebrow">{t("fav_photos_eyebrow")}</p>
              <h1>{t("fav_photos_title")}</h1>
            </div>
          </div>
          <Photos hideSaveSearch={true} />
        </div>
      </main>
    </div>
  );
};

export default FavoritePhotos;
