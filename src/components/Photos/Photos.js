import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Centered from "../Centered/Centered";
import { FiCameraOff } from "react-icons/fi";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import TotalsPhotos from "../Totals";
import { useLanguage } from "../../contexts/LanguageContext";
import "./styles.css";

const Photos = ({ photos, handleSavePhoto, hideSaveSearch = false }) => {
  const { t } = useLanguage();

  // Estado local sincronizado con localStorage para las fotos favoritas individuales
  const [favPhotos, setFavPhotos] = useState(() => {
    return JSON.parse(localStorage.getItem("favoritePhotos")) || [];
  });

  // Si estamos en la vista de favoritos (hideSaveSearch === true), la fuente de verdad es el estado local de favPhotos
  const photosArr = hideSaveSearch ? favPhotos : (photos?.photos || []);

  const toggleFav = (photo) => {
    let updated;
    const isFav = favPhotos.some((p) => p.id === photo.id);
    if (isFav) {
      updated = favPhotos.filter((p) => p.id !== photo.id);
    } else {
      updated = [...favPhotos, photo];
    }
    setFavPhotos(updated);
    localStorage.setItem("favoritePhotos", JSON.stringify(updated));
  };

  if (photosArr.length === 0) {
    return (
      <Centered>
        <FiCameraOff />
        <div style={{ marginTop: "12px", textAlign: "center", maxWidth: "480px" }}>
          {hideSaveSearch ? t("fav_photos_empty") : t("gallery_no_photos")}
        </div>
      </Centered>
    );
  }

  return (
    <>
      <div className="gallery-toolbar">
        <div>
          <span>{t("gallery_results")}</span>
          <strong>
            {photosArr.length} {hideSaveSearch ? t("fav_photos_results") : t("gallery_found")}
          </strong>
        </div>
        {!hideSaveSearch && (
          <button
            className="favorite-action"
            onClick={handleSavePhoto}
            title={t("filter_save_btn")}
            type="button"
          >
            <AiOutlineStar />
            {t("filter_save_btn")}
          </button>
        )}
      </div>

      <div className="photos-grid">
        {photosArr.map((photo) => {
          const isFav = favPhotos.some((p) => p.id === photo.id);
          return (
            <Card className="card__color" key={photo.id}>
              <div className="image-shell">
                <Card.Img
                  variant="top"
                  className="img"
                  src={photo.img_src}
                  alt={`Foto de Marte ${photo.id}`}
                />
              </div>
              <Card.Body>
                <div className="card-heading">
                  <Card.Title className="card-title__color">
                    Foto #{photo.id}
                  </Card.Title>
                  <button
                    type="button"
                    className="star-button"
                    onClick={() => toggleFav(photo)}
                    title={isFav ? t("card_star_remove") : t("card_star_add")}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {isFav ? (
                      <AiFillStar
                        style={{
                          color: "var(--mars-gold)",
                          fontSize: "24px",
                          filter: "drop-shadow(0 0 4px rgba(241, 180, 91, 0.4))",
                        }}
                      />
                    ) : (
                      <AiOutlineStar
                        style={{
                          color: "var(--mars-muted)",
                          fontSize: "24px",
                        }}
                      />
                    )}
                  </button>
                </div>
                <dl className="photo-meta">
                  <div>
                    <dt>{t("card_earth_date")}</dt>
                    <dd>{photo.earth_date}</dd>
                  </div>
                  <div>
                    <dt>{t("card_sol")}</dt>
                    <dd>{photo.sol}</dd>
                  </div>
                  <div>
                    <dt>{t("card_rover")}</dt>
                    <dd>{photo.rover.name}</dd>
                  </div>
                  <div>
                    <dt>{t("card_camera")}</dt>
                    <dd>{photo.camera.full_name}</dd>
                  </div>
                  <div>
                    <dt>{t("card_launch")}</dt>
                    <dd>{photo.rover.launch_date}</dd>
                  </div>
                  <div>
                    <dt>{t("card_status")}</dt>
                    <dd>{photo.rover.status}</dd>
                  </div>
                </dl>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <TotalsPhotos total={photosArr.length} />
    </>
  );
};

export default Photos;
