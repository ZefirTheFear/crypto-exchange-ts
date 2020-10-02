import React, { useContext } from "react";

import Context from "../../context";

import "./MenuMobile.scss";

const MenuMobile = () => {
  const context = useContext(Context);

  const closeMenuNGoToNode = node => {
    context.scrollTo(node);
    context.closeMenu();
  };

  return (
    <nav className="menu-mobile">
      <div
        className="menu-mobile__item"
        onClick={() => {
          closeMenuNGoToNode(document.querySelector(".calculator-section"));
        }}
      >
        калькулятор
      </div>
      <div
        className="menu-mobile__item"
        onClick={() => {
          closeMenuNGoToNode(document.querySelector(".exchange"));
        }}
      >
        обмен
      </div>
      <div
        className="menu-mobile__item"
        onClick={() => {
          closeMenuNGoToNode(document.querySelector(".about-us"));
        }}
      >
        о нас
      </div>
      <div
        className="menu-mobile__item"
        onClick={() => {
          closeMenuNGoToNode(document.querySelector(".contacts"));
        }}
      >
        контакты
      </div>
    </nav>
  );
};

export default MenuMobile;
