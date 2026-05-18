import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Centered from "../Centered/Centered";
import { FiCameraOff } from "react-icons/fi";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import TotalsPhotos from "../Totals";
import Pagination from "../Pagination";
import { useLanguage } from "../../contexts/LanguageContext";
import "./styles.css";

const Photos = ({ 
  photos, 
  handleSavePhoto, 
  hideSaveSearch = false, 
  page = 1,
  hideTotals = false,
  hideResultsHeader = false
}) => {
  const { t } = useLanguage();

  // Estado local sincronizado con localStorage para las fotos favoritas individuales
  const [favPhotos, setFavPhotos] = useState(() => {
    return JSON.parse(localStorage.getItem("favoritePhotos")) || [];
  });

  // Estado de paginación local exclusivo para la vista de favoritos
  const [localPage, setLocalPage] = useState(1);

  // Estado para la foto seleccionada en pantalla completa (Lightbox)
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Si estamos en la vista de favoritos (hideSaveSearch === true), la fuente de verdad es el estado local de favPhotos
  const fullPhotosArr = hideSaveSearch ? favPhotos : (photos?.photos || []);
  
  const activePage = hideSaveSearch ? localPage : page;
  
  // Realizar rebanado de 8 fotos por página para la vista actual
  const photosArr = fullPhotosArr.slice((activePage - 1) * 8, activePage * 8);

  const totalPages = Math.ceil(fullPhotosArr.length / 8);

  // Auto-corregir la página actual si el usuario desmarca favoritos y la página queda fuera de límites
  useEffect(() => {
    if (hideSaveSearch && localPage > totalPages && totalPages > 0) {
      setLocalPage(totalPages);
    }
  }, [fullPhotosArr.length, localPage, totalPages, hideSaveSearch]);

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
      {!hideResultsHeader && (
        <div className="gallery-toolbar">
          <div>
            <span>{t("gallery_results")}</span>
            <strong>
              {fullPhotosArr.length} {hideSaveSearch ? t("fav_photos_results") : t("gallery_found")}
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
      )}

      <div className="photos-grid">
        {photosArr.map((photo) => {
          const isFav = favPhotos.some((p) => p.id === photo.id);
          return (
            <Card className="card__color" key={photo.id}>
              <div className="image-shell" onClick={() => setSelectedPhoto(photo)}>
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
      {!hideTotals && <TotalsPhotos total={fullPhotosArr.length} />}

      {hideSaveSearch && fullPhotosArr.length > 8 && (
        <section className="gallery-section" style={{ marginTop: "32px", width: "100%" }}>
          <Pagination
            setPage={(p) => { window.scrollTo(0, 0); setLocalPage(p); }}
            page={localPage}
            totalPages={totalPages}
          />
        </section>
      )}

      {selectedPhoto && (
        <div className="lightbox-backdrop" onClick={() => setSelectedPhoto(null)}>
          <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>
            &times;
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.img_src}
              alt={`Mars ${selectedPhoto.id}`}
              className="lightbox-image"
            />
            <div className="lightbox-caption">
              <h3>Foto #{selectedPhoto.id}</h3>
              <p>
                <strong>{t("card_rover") || "Rover"}:</strong> {selectedPhoto.rover.name} | <strong>{t("card_sol") || "Sol"}:</strong> {selectedPhoto.sol} | <strong>{t("card_earth_date") || "Fecha Terrestre"}:</strong> {selectedPhoto.earth_date}
              </p>
              <p className="lightbox-camera">
                <strong>{t("card_camera") || "Cámara"}:</strong> {selectedPhoto.camera.full_name}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Photos;
