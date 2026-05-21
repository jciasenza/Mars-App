import React, { useState } from "react";
import "../../App.css";
import styles from "./fondo.module.css";
import Photos from "../../components/Photos/Photos";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import Centered from "../../components/Centered/Centered";
import { useLanguage } from "../../contexts/LanguageContext";
import { marsApi } from "../../services/marsApi";

const SearchById = () => {
  const { t } = useLanguage();
  const [photoId, setPhotoId] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!photoId.trim()) return;

    setLoading(true);
    setError(null);
    setPhoto(null);

    try {
      const res = await fetch(marsApi.byId(photoId.trim()));
      if (!res.ok) {
        throw new Error(t("buscar_id_not_found"));
      }
      const data = await res.json();
      if (data && (data.id || data.photo)) {
        const photoData = data.photo || data;
        setPhoto(photoData);
      } else {
        setError({ message: t("buscar_id_not_found") });
      }
    } catch (err) {
      setError({
        message: err.message || t("buscar_id_not_found")
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <main className="main-shell">
        <div className={styles.fondo}>
          <div className={styles.title} style={{ marginBottom: "30px" }}>
            <div>
              <p className="eyebrow">{t("filter_eyebrow")}</p>
              <h1>{t("buscar_id_title")}</h1>
            </div>
          </div>

          <form onSubmit={handleSearch} className="select" style={{ display: "flex", gap: "12px", alignItems: "flex-end", maxWidth: "480px", marginBottom: "30px" }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="select-photo-id">{t("buscar_id_title")}</label>
              <input
                id="select-photo-id"
                className="form-select"
                type="number"
                min="1"
                value={photoId}
                onChange={(e) => setPhotoId(e.target.value)}
                placeholder={t("buscar_id_placeholder")}
                style={{ width: "100%" }}
              />
            </div>
            <button
              className="favorite-action"
              type="submit"
              disabled={loading || !photoId.trim()}
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: (!photoId.trim() || loading) ? 0.6 : 1,
                cursor: (!photoId.trim() || loading) ? "not-allowed" : "pointer"
              }}
            >
              {t("buscar_id_btn")}
            </button>
          </form>

          <div className="photos-output" style={{ minHeight: "150px", position: "relative" }}>
            {loading && (
              <Centered>
                <Loader />
              </Centered>
            )}

            {!loading && error && (
              <Centered>
                <Message
                  msg={error.message}
                  bgColor="#dc3545"
                />
              </Centered>
            )}

            {!loading && !error && photo && (
              <Photos 
                photos={{ photos: [photo] }} 
                handleSavePhoto={null} 
                page={1} 
                hideSaveSearch={true}
                hideTotals={true}
                isFavoritesView={false}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchById;
