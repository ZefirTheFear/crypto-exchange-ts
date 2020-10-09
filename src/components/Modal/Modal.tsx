import React, { useEffect } from "react";

import "./Modal.scss";

interface ModalProps {
  text: string;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ text, closeModal }) => {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div className="modal-bg">
      <div className="modal">
        <p className="modal__text">{text}</p>
        <button type="button" className="modal__btn" onClick={closeModal}>
          ок
        </button>
      </div>
    </div>
  );
};

export default Modal;
