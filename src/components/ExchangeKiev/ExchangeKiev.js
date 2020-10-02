import React from "react";
import { Link } from "react-router-dom";

import "./ExchangeKiev.scss";

const ExchangeKiev = () => {
  return (
    <section className="exchange-kiev">
      <Link to="/obmen-kriptovalyut">Обмен Киев</Link>
    </section>
  );
};

export default ExchangeKiev;
