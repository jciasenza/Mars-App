import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SelectsList from "./SelectsList";
import SelectsListCamara from "./SelectsListCamara";
import SelectsListRover from "./SelectsListRover";
import SelectsListTerrestre from "./SelectsListTerrestre";
import Pagination from "./Pagination";
import Modal from "./Modal/Modal";
import { useMarsPhotos } from "../hooks/useMarsPhotos";
import { useLanguage } from "../contexts/LanguageContext";

let myPhotosInit = JSON.parse(localStorage.getItem("myPhotos")) || [];

export const LIMITS = [5, 10, 25];

const SelectsAnidados = ({ select }) => {
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();

  // Inicializar estados desde Query Params para soportar el botón "Ver" de Favoritos
  const [rover, setRover] = useState(searchParams.get("rover") || "curiosity");
  const [sol, setSol] = useState(searchParams.get("sol") || "1000");
  const [terrestre, setTerrestre] = useState(searchParams.get("earth_date") || "2023-01-01");
  const [camera, setCamera] = useState(searchParams.get("camera") || "fhaz");
  const [page, setPage] = useState(parseInt(searchParams.get("page"), 10) || 1);
  
  const [limit, setLimit] = useState();
  const [myPhotos, setMyPhotos] = useState(myPhotosInit);
  const [modal, setModal] = useState({ isOpen: false });

  // Sincronizar estados si cambian las searchParams de la URL (cuando navegas de un favorito a otro)
  useEffect(() => {
    const r = searchParams.get("rover");
    const s = searchParams.get("sol");
    const t = searchParams.get("earth_date");
    const c = searchParams.get("camera");
    const p = searchParams.get("page");

    if (r) setRover(r);
    if (s) setSol(s);
    if (t) setTerrestre(t);
    if (c) setCamera(c);
    if (p) setPage(parseInt(p, 10));
  }, [searchParams]);

  // Una sola llamada a la API, centralizada en el custom hook
  const { photos, loading, error } = useMarsPhotos({
    rover,
    sol,
    earthDate: terrestre,
    camera,
    page,
    mode: select ? "sol" : "earth_date",
  });

  useEffect(() => {
    localStorage.setItem("myPhotos", JSON.stringify(myPhotos));
  }, [myPhotos]);

  const handleSavePhoto = () => {
    const currentPhoto = { rover, sol, terrestre, camera, page };
    setMyPhotos((prev) => [...prev, currentPhoto]);
    setModal({ isOpen: true });
  };

  return (
    <div className="App">
      <Modal
        isOpen={modal.isOpen}
        type="success"
        title={t("modal_success_title")}
        message={`${t("modal_success_desc")} (Rover: ${rover}, Camera: ${camera})`}
        confirmText={t("modal_btn_ok")}
        onConfirm={() => setModal({ isOpen: false })}
      />

      <main className="main-shell">
        <section className="view-header">
          <div>
            <p className="eyebrow">{t("filter_eyebrow")}</p>
            <h1 className="view-title">
              {select ? t("filter_title_solar") : t("filter_title_terrestre")}
            </h1>
            <p className="view-copy">
              {t("filter_desc")}
            </p>
          </div>
        </section>

        <section className="filters-panel" aria-label="Filtros de busqueda">
          {/* Dropdowns UI — no hacen fetch, solo disparan cambios de estado */}
          <SelectsListRover
            handleChange={(e) => setRover(e.target.value)}
          />
          <SelectsListCamara
            handleChange={(e) => setCamera(e.target.value)}
          />

          {/* Input de fecha + galería de fotos — reciben datos ya resueltos */}
          {select ? (
            <SelectsList
              handleChange={(e) => setSol(e.target.value)}
              handleSavePhoto={handleSavePhoto}
              photos={photos}
              loading={loading}
              error={error}
            />
          ) : (
            <SelectsListTerrestre
              handleChange={(e) => setTerrestre(e.target.value)}
              handleSavePhoto={handleSavePhoto}
              photos={photos}
              loading={loading}
              error={error}
            />
          )}
        </section>

        <section className="gallery-section">
          <Pagination
            setPage={(p) => { window.scrollTo(0, 0); setPage(p); }}
            page={page}
            limit={limit}
            setLimit={(l) => { window.scrollTo(0, 0); setLimit(l); }}
          />
        </section>
      </main>
    </div>
  );
};

export default SelectsAnidados;
