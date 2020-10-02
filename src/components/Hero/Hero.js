import React from "react";

import logo from "../../assets/img/logo_img.svg";
import logoWords from "../../assets/img/logo_words.svg";
import "./Hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__inner">
        <p className="hero__text">вместе к успеху</p>
        <div className="hero-logo">
          <img src={logo} alt="logo" className="hero__logo-img" />
          <img src={logoWords} alt="logo" className="hero__logo-words" />
        </div>
        <p className="hero__text">обмен криптовалюты</p>
      </div>
    </section>
  );
};

export default Hero;
