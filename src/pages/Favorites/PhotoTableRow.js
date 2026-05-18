import React from "react";
import { useNavigate } from "react-router-dom";
import { ImEye } from "react-icons/im";
import { BsTrash } from "react-icons/bs";
import { useLanguage } from "../../contexts/LanguageContext";

const PhotoTableRow = ({ id, misFotos, onDelete }) => {
  let { sol, camera, terrestre, rover, page } = misFotos;
  let navigate = useNavigate();
  const { t } = useLanguage();

  const handleView = () => {
    // Si tiene sol y no es "0", es búsqueda por fecha solar, de lo contrario terrestre
    if (sol && sol !== "0") {
      navigate(`/sol?rover=${rover}&camera=${camera}&sol=${sol}&page=${page}`);
    } else {
      navigate(`/terrestre?rover=${rover}&camera=${camera}&earth_date=${terrestre}&page=${page}`);
    }
  };

  return (
    <tr className="tabla2">
      <td>{id}</td>
      <td>{page}</td>
      <td>{camera}</td>
      <td>{rover}</td>
      <td>{terrestre}</td>
      <td>{sol}</td>
      <td>
        <button
          className="ver"
          type="button"
          onClick={handleView}
          title={t("nav_busquedas")}
        >
          <ImEye />
        </button> 
        <button
          className="eliminar"
          title={t("modal_btn_confirm")}
          type="button"
          onClick={() => onDelete(id)}
        >
          <BsTrash />
        </button>
      </td>
    </tr>
  );
};

export default PhotoTableRow;
