import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import navItemsFn from "../../utils/ts/navItems";

import { RootState } from "../../store/store";

import "./MenuMobile.scss";

const MenuMobile: React.FC = () => {
  console.log("MenuMobile render");

  const dispatch = useDispatch();

  const isMobileMenuOpen = useSelector((state: RootState) => state.mobileMenuState.isOpen);

  const navItems = useMemo(() => {
    return navItemsFn(dispatch);
  }, [dispatch]);

  return (
    <nav className={"menu-mobile" + (isMobileMenuOpen ? " menu-mobile_open" : "")}>
      {navItems.map((item) => (
        <div className="menu-mobile__item" onClick={item.onClick} key={item.title}>
          {item.title}
        </div>
      ))}
    </nav>
  );
};

export default MenuMobile;
