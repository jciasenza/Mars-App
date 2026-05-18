import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

/**
 * SelectsListCamara — Dropdown de selección de cámara.
 * Componente UI puro: no hace fetch, solo dispara eventos onChange.
 */
const SelectsListCamara = ({ handleChange }) => {
  const { t } = useLanguage();

  return (
    <div className="select">
      <label htmlFor="select-camera">{t("filter_select_camera")}</label>
      <select
        className="form-select"
        id="select-camera"
        name="select-camera"
        onChange={handleChange}
        defaultValue="fhaz"
      >
        <option value="fhaz">Front Hazard Avoidance Camera</option>
        <option value="rhaz">Rear Hazard Avoidance Camera</option>
        <option value="mast">Mast Camera</option>
        <option value="chemcam">Chemistry and Camera Complex</option>
        <option value="mahli">Mars Hand Lens Imager</option>
        <option value="mardi">Mars Descent Imager</option>
        <option value="navcam">Navigation Camera</option>
        <option value="pancam">Panoramic Camera</option>
        <option value="minites">Miniature Thermal Emission Spectrometer (Mini-TES)</option>
      </select>
    </div>
  );
};

export default SelectsListCamara;
