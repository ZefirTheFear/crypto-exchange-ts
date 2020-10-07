export const SCROLL_TO_CALC = "SCROLL_TO_CALC";
export const SCROLL_TO_EXCHANGE = "SCROLL_TO_EXCHANGE";
export const SCROLL_TO_ABOUT_US = "SCROLL_TO_ABOUT_US";
export const SCROLL_TO_CONTACTS = "SCROLL_TO_CONTACTS";

export interface ScrollToCalc {
  type: typeof SCROLL_TO_CALC;
}

export interface ScrollToExchange {
  type: typeof SCROLL_TO_EXCHANGE;
}

export interface ScrollToAboutUs {
  type: typeof SCROLL_TO_ABOUT_US;
}

export interface ScrollToContacts {
  type: typeof SCROLL_TO_CONTACTS;
}

export type ScrollActionType = ScrollToCalc | ScrollToExchange | ScrollToAboutUs | ScrollToContacts;
