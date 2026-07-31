import { XCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Generic modal dialog used for the favourites list. Handles the backdrop,
// Escape-to-close, and basic focus management (focuses the close button on
// open, returns focus to whatever triggered the modal on close) so it
// behaves like a real dialog for keyboard and screen-reader users.
function Modal({ title, onClose, children }) {
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(document.activeElement);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const trigger = triggerRef.current;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus?.();
    };
  }, [onClose]);

  return (
    <div>
      <div className="backdrop" onClick={onClose} />
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal__header">
          <h2 className="title" id="modal-title">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <XCircleIcon className="icon close" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
