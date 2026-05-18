import React from "react";
import "./Modal.css";

/**
 * Modal reutilizable.
 * Props:
 *   isOpen   {boolean}  - controla visibilidad
 *   title    {string}   - título del modal
 *   message  {string}   - mensaje o descripción
 *   onConfirm {func}    - callback al confirmar (botón primario)
 *   onCancel  {func}    - callback al cancelar / cerrar
 *   confirmText {string} - texto del botón de confirmación (default: "Aceptar")
 *   cancelText  {string} - texto del botón de cancelación (default: "Cancelar")
 *   type     {string}   - "info" | "success" | "warning" | "danger" (default: "info")
 */
const Modal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  type = "info",
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className={`modal-icon modal-icon--${type}`}>
          {type === "success" && "✓"}
          {type === "warning" && "!"}
          {type === "danger"  && "⚠"}
          {type === "info"    && "i"}
        </div>
        <h2 id="modal-title" className="modal-title">{title}</h2>
        {message && <p className="modal-message">{message}</p>}
        <div className="modal-actions">
          {onCancel && (
            <button className="modal-btn modal-btn--cancel" onClick={onCancel}>
              {cancelText}
            </button>
          )}
          {onConfirm && (
            <button className="modal-btn modal-btn--confirm" onClick={onConfirm} autoFocus>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
