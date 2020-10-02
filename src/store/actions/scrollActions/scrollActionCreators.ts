import * as scrollActionTypes from "./scrollActionTypes";

export const scrollToCalc = (): scrollActionTypes.ScrollToCalc => ({
  type: scrollActionTypes.SCROLL_TO_CALC
});

export const scrollToExchange = (): scrollActionTypes.ScrollToExchange => ({
  type: scrollActionTypes.SCROLL_TO_EXCHANGE
});

export const scrollToAboutUs = (): scrollActionTypes.ScrollToAboutUs => ({
  type: scrollActionTypes.SCROLL_TO_ABOUT_US
});

export const scrollToContacts = (): scrollActionTypes.ScrollToContacts => ({
  type: scrollActionTypes.SCROLL_TO_CONTACTS
});
