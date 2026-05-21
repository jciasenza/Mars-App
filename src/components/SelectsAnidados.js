import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SelectsList from "./SelectsList";
import SelectsListRover from "./SelectsListRover";
import SelectsListTerrestre from "./SelectsListTerrestre";
import Pagination from "./Pagination";
import Modal from "./Modal/Modal";
import { useMarsPhotos } from "../hooks/useMarsPhotos";
import { useLanguage } from "../contexts/LanguageContext";

export const LIMITS = [5, 10, 25];

const SelectsAnidados = ({ select }) => {
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();

  // Inicializar estados desde Query Params para soportar el botón "Ver" de Favoritos
  const [rover, setRover] = useState(searchParams.get("rover") || "curiosity");
  const [sol, setSol] = useState(searchParams.get("sol") || "1");
  const [terrestre, setTerrestre] = useState(searchParams.get("earth_date") || "2015-01-01");
  const [page, setPage] = useState(parseInt(searchParams.get("page"), 10) || 1);
  const [myPhotos, setMyPhotos] = useState(() => {
    return JSON.parse(localStorage.getItem("myPhotos")) || [];
  });
  const [modal, setModal] = useState({ isOpen: false });

  // Sincronizar estados si cambian las searchParams de la URL (cuando navegas de un favorito a otro)
  useEffect(() => {
    const r = searchParams.get("rover");
    const s = searchParams.get("sol");
    const t = searchParams.get("earth_date");

    if (r) setRover(r);
    if (s) setSol(s);
    if (t) setTerrestre(t);
  }, [searchParams]);

  // Al cambiar filtros principales, resetear a la página 1 de forma automática
  useEffect(() => {
    setPage(1);
  }, [rover, sol, terrestre]);

  // Una sola llamada a la API, centralizada en el custom hook
  // Una sola llamada a la API, centralizada en el custom hook (fijamos page = 1 para traer todo el lote de 25)
  const { photos, loading, error } = useMarsPhotos({
    rover,
    sol,
    earthDate: terrestre,
    page: 1,
    mode: select ? "sol" : "earth_date",
  });

  useEffect(() => {
    localStorage.setItem("myPhotos", JSON.stringify(myPhotos));
  }, [myPhotos]);

  const handleSavePhoto = () => {
    // Si ya está guardada, no hacer nada para prevenir duplicados
    if (isSearchSaved) return;

    const currentPhoto = { 
      rover, 
      sol: select ? sol : "0", 
      terrestre: select ? "0" : terrestre, 
      page 
    };
    setMyPhotos((prev) => [...prev, currentPhoto]);
    setModal({ isOpen: true });
  };

  const isSearchSaved = myPhotos.some((item) => {
    return (
      item.rover === rover &&
      (select 
        ? item.sol === sol && item.sol !== "0"
        : item.terrestre === terrestre && item.terrestre !== "0")
    );
  });

  return (
    <div className="App">
      <Modal
        isOpen={modal.isOpen}
        type="success"
        title={t("modal_success_title")}
        message={`${t("modal_success_desc")} (Rover: ${rover})`}
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

          {/* Input de fecha + galería de fotos — reciben datos ya resueltos */}
          {select ? (
            <SelectsList
              handleChange={(e) => setSol(e.target.value)}
              handleSavePhoto={handleSavePhoto}
              photos={photos}
              loading={loading}
              error={error}
              page={page}
              isSearchSaved={isSearchSaved}
            />
          ) : (
            <SelectsListTerrestre
              handleChange={(e) => setTerrestre(e.target.value)}
              handleSavePhoto={handleSavePhoto}
              photos={photos}
              loading={loading}
              error={error}
              page={page}
              isSearchSaved={isSearchSaved}
            />
          )}
        </section>

        {photos && photos.length > 8 && (
          <section className="gallery-section">
            <Pagination
              setPage={(p) => { window.scrollTo(0, 0); setPage(p); }}
              page={page}
              totalPages={Math.ceil(photos.length / 8)}
            />
          </section>
        )}
      </main>
    </div>
  );
};

export default SelectsAnidados;
