import React from "react";
import Message from "./Message";
import Photos from "./Photos/Photos";
import Loader from "./Loader/Loader";
import Centered from "./Centered/Centered";
import { useLanguage } from "../contexts/LanguageContext";

/**
 * SelectsListTerrestre — Input de fecha terrestre + galería de fotos.
 * Recibe photos/loading/error desde el padre (SelectsAnidados via useMarsPhotos).
 * Siempre renderiza el input para que el usuario pueda cambiar de fecha incluso en caso de error o loading.
 */
const SelectsListTerrestre = ({ handleChange, handleSavePhoto, photos, loading, error, page }) => {
  const { t } = useLanguage();

  return (
    <>
      <div className="select">
        <label htmlFor="select-earth-date">{t("filter_select_date_terrestre")}</label>
        <input
          id="select-earth-date"
          className="form-select"
          onChange={handleChange}
          type="date"
          name="trip-start"
          defaultValue="2015-01-01"
        />
      </div>

      <div className="photos-output">
        {loading && (
          <Centered>
            <Loader />
          </Centered>
        )}
        
        {!loading && error && (
          <Centered>
            <Message
              msg={`${error.status ? `Error ${error.status}` : "Network Error"}: ${error.statusText || error.message || "An unexpected error occurred"}`}
              bgColor="#dc3545"
            />
          </Centered>
        )}
        
        {!loading && !error && (
          <Photos photos={{ photos }} handleSavePhoto={handleSavePhoto} page={page} />
        )}
      </div>
    </>
  );
};

export default SelectsListTerrestre;
