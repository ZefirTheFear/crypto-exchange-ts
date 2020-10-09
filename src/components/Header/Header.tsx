import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import logo from "../../assets/img/logo_full.svg";

import navItemsFn from "../../utils/ts/navItems";

import { RootState } from "../../store/store";
import * as mobileMenuActions from "../../store/actions/mobileMenuActions/mobileMenuActionCreators";

import "./Header.scss";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const isMobileMenuOpen = useSelector((state: RootState) => state.mobileMenuState.isOpen);

  const navItems = useMemo(() => {
    return navItemsFn(dispatch);
  }, [dispatch]);

  const logoClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    dispatch(mobileMenuActions.closeMobileMenu());
  }, [dispatch]);

  const toggleMenu = useCallback(() => {
    dispatch(mobileMenuActions.toggleMobileMenu());
  }, [dispatch]);

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo" onClick={logoClick}>
          <img src={logo} alt="logo" className="header__logo-img" />
        </div>
        <nav className="header__menu">
          {navItems.map((item) => (
            <div className="header__menu-item" onClick={item.onClick} key={item.title}>
              {item.title}
            </div>
          ))}
        </nav>
        <div
          className={"menu__btn" + (isMobileMenuOpen ? " menu__btn_close" : "")}
          onClick={toggleMenu}
        >
          <div className="menu__btn-line" />
          <div className="menu__btn-line" />
          <div className="menu__btn-line" />
        </div>
      </div>
    </header>
  );
};

export default Header;
