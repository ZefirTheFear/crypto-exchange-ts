import React, { useEffect } from "react";

import "./Modal.scss";

const Modal = props => {
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
        <p className="modal__text">{props.text}</p>
        <button type="button" className="modal__btn" onClick={props.closeModal}>
          ок
        </button>
      </div>
    </div>
  );
};

export default Modal;
