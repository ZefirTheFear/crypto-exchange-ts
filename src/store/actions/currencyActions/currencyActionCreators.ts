import { Currency } from "./../../../models/currency";
import * as currencyActionTypes from "./currencyActionTypes";

export const setCurrenciesFromCustomer = (
  currencies: Currency[]
): currencyActionTypes.SetCurrenciesFromCustomer => ({
  type: currencyActionTypes.SET_CURRECNCIES_FROM_CUSTOMER,
  payload: {
    currencies
  }
});

export const setCurrenciesToCustomer = (
  currencies: Currency[]
): currencyActionTypes.SetCurrenciesToCustomer => ({
  type: currencyActionTypes.SET_CURRECNCIES_TO_CUSTOMER,
  payload: {
    currencies
  }
});

export const setCurrentCurrencyFromCustomer = (
  currency: Currency
): currencyActionTypes.SetCurrentCurrencyFromCustomer => ({
  type: currencyActionTypes.SET_CURRENT_CURRENCY_FROM_CUSTOMER,
  payload: {
    currency
  }
});

export const setCurrentCurrencyToCustomer = (
  currency: Currency
): currencyActionTypes.SetCurrentCurrencyToCustomer => ({
  type: currencyActionTypes.SET_CURRENT_CURRENCY_TO_CUSTOMER,
  payload: {
    currency
  }
});

export const swapCurrencies = (): currencyActionTypes.SwapCurrencies => ({
  type: currencyActionTypes.SWAP_CURRENCIES
});

export const changeCurrencyFromCustomerAmount = (
  amount: string
): currencyActionTypes.ChangeCurrencyFromCustomer => ({
  type: currencyActionTypes.CHANGE_CURRENCY_FROM_CUSTOMER_AMOUNT,
  payload: {
    amount
  }
});

export const changeCurrencyToCustomerAmount = (
  amount: string
): currencyActionTypes.ChangeCurrencyToCustomer => ({
  type: currencyActionTypes.CHANGE_CURRENCY_TO_CUSTOMER_AMOUNT,
  payload: {
    amount
  }
});

export const setPercentages = (
  percentages: currencyActionTypes.Percentage[]
): currencyActionTypes.SetPercentages => ({
  type: currencyActionTypes.SET_PERCANTAGES,
  payload: {
    percentages
  }
});
