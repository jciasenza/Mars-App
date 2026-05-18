import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

/**
 * SelectsListRover — Dropdown de selección de rover.
 * Componente UI puro: no hace fetch, solo dispara eventos onChange.
 */
const SelectsListRover = ({ handleChange }) => {
  const { t } = useLanguage();

  return (
    <div className="select">
      <label htmlFor="select-rover">{t("filter_select_rover")}</label>
      <select
        className="form-select"
        id="select-rover"
        name="select-rover"
        onChange={handleChange}
        defaultValue="curiosity"
      >
        <option value="curiosity">Curiosity</option>
        <option value="perseverance">Perseverance</option>
      </select>
    </div>
  );
};

export default SelectsListRover;
