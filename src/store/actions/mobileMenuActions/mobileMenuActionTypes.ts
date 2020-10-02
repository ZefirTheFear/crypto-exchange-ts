export const OPEN_MOBILE_MENU = "OPEN_MOBILE_MENU";
export const CLOSE_MOBILE_MENU = "CLOSE_MOBILE_MENU";
export const TOGGLE_MOBILE_MENU = "TOGGLE_MOBILE_MENU";

export interface OpenMobileMenu {
  type: typeof OPEN_MOBILE_MENU;
}

export interface CloseMobileMenu {
  type: typeof CLOSE_MOBILE_MENU;
}

export interface ToggleMobileMenu {
  type: typeof TOGGLE_MOBILE_MENU;
}

export type MobileMenuActionType = OpenMobileMenu | CloseMobileMenu | ToggleMobileMenu;
