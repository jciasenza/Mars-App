import React from "react";
import PhotoTableRow from "./PhotoTableRow";
import { useLanguage } from "../../contexts/LanguageContext";

const PhotoTableFav = ({ myPhotos, onDelete }) => {
  const { t } = useLanguage();

  return (
    <div className="listado">
      <table className="favorites-table">
        <thead>
          <tr>
            <th>{t("fav_searches_table_id")}</th>
            <th>{t("fav_searches_table_page")}</th>
            <th>{t("fav_searches_table_camera")}</th>
            <th>{t("fav_searches_table_rover")}</th>
            <th>{t("fav_searches_table_earth")}</th>
            <th>{t("fav_searches_table_solar")}</th>
            <th>{t("fav_searches_table_actions")}</th>
          </tr>
        </thead>
        <tbody>
          {myPhotos.length > 0 ? (
            myPhotos.map((misFotos, index) => (
              <PhotoTableRow
                key={index}
                id={index}
                misFotos={misFotos}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="vacio" style={{ textAlign: "center", padding: "32px", color: "var(--mars-muted)" }}>
                {t("fav_searches_empty")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PhotoTableFav;
