import "../../App.css";
import styles from "./fondo.module.css";
import PhotoTableFav from "./PhotoTableFav";
import { BsTrash } from "react-icons/bs";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import Pagination from "../../components/Pagination";
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

  // Estado para la paginación de búsquedas guardadas
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(myPhotos.length / itemsPerPage);

  // Auto-corregir la página actual si se eliminan elementos y la página queda vacía
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [myPhotos.length, page, totalPages]);

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
            <PhotoTableFav 
              myPhotos={myPhotos.slice((page - 1) * itemsPerPage, page * itemsPerPage)} 
              onDelete={setDeleteIndex} 
            />
          </div>

          {myPhotos.length > itemsPerPage && (
            <section className="gallery-section" style={{ marginTop: "24px", display: "flex", justifyContent: "center" }}>
              <Pagination
                setPage={(p) => { window.scrollTo(0, 0); setPage(p); }}
                page={page}
                totalPages={totalPages}
              />
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Favorites;
