import "../../App.css";
import styles from "./fondo.module.css";
import PhotoTableFav from "./PhotoTableFav";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import { useLanguage } from "../../contexts/LanguageContext";

const Favorites = () => {
  const { t } = useLanguage();
  const [myPhotos, setMyPhotos] = useState(
    JSON.parse(localStorage.getItem("myPhotos")) || []
  );

  // Modal para vaciar todos los favoritos (búsquedas)
  const [confirmClearModal, setConfirmClearModal] = useState(false);
  
  // Estado para eliminar un favorito individual por su índice
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleLimpiarTodos = () => {
    setConfirmClearModal(true);
  };

  const confirmClearAll = () => {
    localStorage.removeItem("myPhotos");
    setMyPhotos([]);
    setConfirmClearModal(false);
  };

  const confirmSingleDelete = () => {
    if (deleteIndex === null) return;
    const updatedPhotos = myPhotos.filter((_, index) => index !== deleteIndex);
    setMyPhotos(updatedPhotos);
    localStorage.setItem("myPhotos", JSON.stringify(updatedPhotos));
    setDeleteIndex(null);
  };

  return (
    <div className="App">
      {/* Modal: Confirmar vaciado de todos los favoritos */}
      <Modal
        isOpen={confirmClearModal}
        type="danger"
        title={t("modal_clear_all_title")}
        message={t("modal_clear_all_desc")}
        confirmText={t("modal_btn_confirm")}
        cancelText={t("modal_btn_cancel")}
        onConfirm={confirmClearAll}
        onCancel={() => setConfirmClearModal(false)}
      />

      {/* Modal: Confirmar eliminación de un favorito individual */}
      <Modal
        isOpen={deleteIndex !== null}
        type="warning"
        title={t("modal_delete_single_title")}
        message={`${t("modal_delete_single_desc")}${deleteIndex}?`}
        confirmText={t("modal_btn_confirm")}
        cancelText={t("modal_btn_cancel")}
        onConfirm={confirmSingleDelete}
        onCancel={() => setDeleteIndex(null)}
      />

      <main className="main-shell">
        <div className={styles.fondo}>
          <div className={styles.title}>
            <div>
              <p className="eyebrow">{t("fav_searches_eyebrow")}</p>
              <h1>{t("fav_searches_title")}</h1>
            </div>
            {myPhotos.length > 0 && (
              <button
                className={styles.cleanButton}
                title={t("modal_clear_all_title")}
                onClick={handleLimpiarTodos}
                type="button"
              >
                <BsTrash />
              </button>
            )}
          </div>
          <div className={styles.tabla}>
            <PhotoTableFav myPhotos={myPhotos} onDelete={setDeleteIndex} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Favorites;
