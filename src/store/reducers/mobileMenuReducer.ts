import * as mobileMenuActionsTypes from "../actions/mobileMenuActions/mobileMenuActionTypes";

interface mobileMenuState {
  isOpen: boolean;
}

const initialState: mobileMenuState = {
  isOpen: false
};

export default (
  state = initialState,
  action: mobileMenuActionsTypes.MobileMenuActionType
): mobileMenuState => {
  switch (action.type) {
    case mobileMenuActionsTypes.OPEN_MOBILE_MENU:
      return { ...state, isOpen: true };

    case mobileMenuActionsTypes.CLOSE_MOBILE_MENU:
      return { ...state, isOpen: false };

    case mobileMenuActionsTypes.TOGGLE_MOBILE_MENU:
      return { ...state, isOpen: !state.isOpen };

    default:
      return state;
  }
};
