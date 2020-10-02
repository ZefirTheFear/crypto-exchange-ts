import React, { useContext } from "react";

import Context from "../../context";
import logo from "../../assets/img/logo_full.svg";

import "./Header.scss";

const Header = () => {
  const context = useContext(Context);

  const logoClick = () => {
    context.scrollTo(document.documentElement);
    context.closeMenu();
  };

  const toggleMenu = () => {
    if (!context.isShownMenu) {
      openMenu();
    } else {
      context.closeMenu();
    }
  };

  const openMenu = () => {
    document.querySelector(".menu__btn").classList.add("menu__btn_close");
    document.querySelector(".menu-mobile").classList.add("menu-mobile_opened");
    context.setIsShownMenu(true);
  };

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo" onClick={logoClick}>
          <img src={logo} alt="logo" className="header__logo-img" />
        </div>
        <nav className="header__menu">
          <div
            className="header__menu-item"
            onClick={() => {
              context.scrollTo(document.querySelector(".calculator-section"));
            }}
          >
            калькулятор
          </div>
          <div
            className="header__menu-item"
            onClick={() => {
              context.scrollTo(document.querySelector(".exchange"));
            }}
          >
            обмен
          </div>
          <div
            className="header__menu-item"
            onClick={() => {
              context.scrollTo(document.querySelector(".about-us"));
            }}
          >
            о нас
          </div>
          <div
            className="header__menu-item"
            onClick={() => {
              context.scrollTo(document.querySelector(".contacts"));
            }}
          >
            контакты
          </div>
        </nav>
        <div className="menu__btn" onClick={toggleMenu}>
          <div className="menu__btn-line" />
          <div className="menu__btn-line" />
          <div className="menu__btn-line" />
        </div>
      </div>
    </header>
  );
};

export default Header;
