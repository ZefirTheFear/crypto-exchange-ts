import React from "react";

import { Link } from "react-router-dom";

import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__text">страница не найдена</div>
      <Link to="/" className="not-found__home-btn">
        на главную
      </Link>
    </div>
  );
};

export default NotFound;
