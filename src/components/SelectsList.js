import React from "react";
import Message from "./Message";
import Photos from "./Photos/Photos";
import Loader from "./Loader/Loader";
import Centered from "./Centered/Centered";
import { useLanguage } from "../contexts/LanguageContext";

/**
 * SelectsList — Input de fecha solar + galería de fotos.
 * Recibe photos/loading/error desde el padre (SelectsAnidados via useMarsPhotos).
 * Siempre renderiza el input para que el usuario pueda cambiar de fecha incluso en caso de error o loading.
 */
const SelectsList = ({ handleChange, handleSavePhoto, photos, loading, error }) => {
  const { t } = useLanguage();

  return (
    <>
      <div className="select">
        <label htmlFor="select-sol">{t("filter_select_date_solar")}</label>
        <input
          id="select-sol"
          className="form-select"
          onChange={handleChange}
          type="number"
          min="0"
          max="3000"
          defaultValue="1000"
          placeholder="Ej: 1000"
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
          <Photos photos={{ photos }} handleSavePhoto={handleSavePhoto} />
        )}
      </div>
    </>
  );
};

export default SelectsList;
