import cloneDeep from "clone-deep";

import { convertCurrency, validate } from "./../../utils/ts/helperFunctions";
import { Currency } from "./../../models/currency";
import * as currencyActionTypes from "../actions/currencyActions/currencyActionTypes";

import ImgBTC from "../../assets/img/BTC.png";
import ImgUSD from "../../assets/img/usd.png";

interface CurrencyState {
  closeOptions: number;
  isBuyCrypto: boolean;
  currenciesFromCustomer: Currency[];
  currenciesToCustomer: Currency[];
  currentCurrencyFromCustomer: Currency;
  currentCurrencyToCustomer: Currency;
  currencyFromCustomerAmount: string;
  currencyToCustomerAmount: string;
  percentages: currencyActionTypes.Percentage[];
  lastModifiedField: "FROM" | "TO";
}

const initialState: CurrencyState = {
  closeOptions: 0,
  isBuyCrypto: true,
  currenciesFromCustomer: [],
  currenciesToCustomer: [],
  currentCurrencyFromCustomer: {
    name: "BTC",
    valueSale: 1,
    valueBuy: 1,
    img: ImgBTC
  },
  currentCurrencyToCustomer: {
    name: "USD",
    valueSale: 1,
    valueBuy: 1,
    img: ImgUSD
  },
  currencyFromCustomerAmount: "",
  currencyToCustomerAmount: "",
  percentages: [
    { amountFrom: 0, amountTo: 999, percentBuyCrypto: -4, percentSaleCrypto: 4 },
    { amountFrom: 1000, amountTo: 4999, percentBuyCrypto: -2, percentSaleCrypto: 3 },
    { amountFrom: 5000, amountTo: 9999, percentBuyCrypto: -1, percentSaleCrypto: 2 },
    { amountFrom: 10000, amountTo: 19999, percentBuyCrypto: -0.5, percentSaleCrypto: 0.8 },
    { amountFrom: 20000, amountTo: 49999, percentBuyCrypto: -0.5, percentSaleCrypto: 0.7 },
    { amountFrom: 50000, amountTo: 99999, percentBuyCrypto: -0.5, percentSaleCrypto: 0.6 }
  ],
  lastModifiedField: "FROM"
};

export default (
  state = initialState,
  action: currencyActionTypes.CurrencyActionType
): CurrencyState => {
  switch (action.type) {
    case currencyActionTypes.SET_CURRECNCIES_FROM_CUSTOMER:
      return { ...state, currenciesFromCustomer: action.payload.currencies };

    case currencyActionTypes.SET_CURRECNCIES_TO_CUSTOMER:
      return { ...state, currenciesToCustomer: action.payload.currencies };

    case currencyActionTypes.SET_CURRENT_CURRENCY_FROM_CUSTOMER:
      const newCurrencyFromCustomer = action.payload.currency;

      if (state.lastModifiedField === "FROM") {
        const newCurrencyToCustomerAmount = convertCurrency(
          state.currencyFromCustomerAmount,
          newCurrencyFromCustomer,
          state.currentCurrencyToCustomer,
          state.percentages,
          state.isBuyCrypto,
          "BUY"
        );
        return {
          ...state,
          currentCurrencyFromCustomer: action.payload.currency,
          currencyToCustomerAmount: newCurrencyToCustomerAmount
        };
      } else {
        const newCurrencyFromCustomerAmount = convertCurrency(
          state.currencyToCustomerAmount,
          state.currentCurrencyToCustomer,
          newCurrencyFromCustomer,
          state.percentages,
          state.isBuyCrypto,
          "SALE"
        );
        return {
          ...state,
          currentCurrencyFromCustomer: action.payload.currency,
          currencyFromCustomerAmount: newCurrencyFromCustomerAmount
        };
      }

    case currencyActionTypes.SET_CURRENT_CURRENCY_TO_CUSTOMER:
      const newCurrencyToCustomer = action.payload.currency;

      if (state.lastModifiedField === "FROM") {
        const newCurrencyToCustomerAmount = convertCurrency(
          state.currencyFromCustomerAmount,
          state.currentCurrencyFromCustomer,
          newCurrencyToCustomer,
          state.percentages,
          state.isBuyCrypto,
          "BUY"
        );
        return {
          ...state,
          currentCurrencyToCustomer: action.payload.currency,
          currencyToCustomerAmount: newCurrencyToCustomerAmount
        };
      } else {
        const newCurrencyFromCustomerAmount = convertCurrency(
          state.currencyToCustomerAmount,
          newCurrencyToCustomer,
          state.currentCurrencyFromCustomer,
          state.percentages,
          state.isBuyCrypto,
          "SALE"
        );
        return {
          ...state,
          currentCurrencyToCustomer: action.payload.currency,
          currencyFromCustomerAmount: newCurrencyFromCustomerAmount
        };
      }

    case currencyActionTypes.SWAP_CURRENCIES:
      const cloneCurrenciesFromCustomer = cloneDeep(state.currenciesFromCustomer);
      const cloneCurrenciesToCustomer = cloneDeep(state.currenciesToCustomer);
      const cloneCurrentCurrencyFromCustomer = cloneDeep(state.currentCurrencyFromCustomer);
      const cloneCurrentCurrencyToCustomer = cloneDeep(state.currentCurrencyToCustomer);
      return {
        ...state,
        closeOptions: state.closeOptions + 1,
        currenciesFromCustomer: cloneCurrenciesToCustomer,
        currenciesToCustomer: cloneCurrenciesFromCustomer,
        currentCurrencyFromCustomer: cloneCurrentCurrencyToCustomer,
        currentCurrencyToCustomer: cloneCurrentCurrencyFromCustomer,
        currencyFromCustomerAmount:
          state.lastModifiedField === "FROM"
            ? convertCurrency(
                state.currencyFromCustomerAmount,
                state.currentCurrencyFromCustomer,
                state.currentCurrencyToCustomer,
                state.percentages,
                !state.isBuyCrypto,
                "SALE"
              )
            : state.currencyToCustomerAmount,
        currencyToCustomerAmount:
          state.lastModifiedField === "FROM"
            ? state.currencyFromCustomerAmount
            : convertCurrency(
                state.currencyToCustomerAmount,
                state.currentCurrencyToCustomer,
                state.currentCurrencyFromCustomer,
                state.percentages,
                !state.isBuyCrypto,
                "BUY"
              ),
        lastModifiedField: state.lastModifiedField === "FROM" ? "TO" : "FROM",
        isBuyCrypto: !state.isBuyCrypto
      };

    case currencyActionTypes.CHANGE_CURRENCY_FROM_CUSTOMER_AMOUNT: {
      const newCurrencyToCustomerAmount = convertCurrency(
        action.payload.amount,
        state.currentCurrencyFromCustomer,
        state.currentCurrencyToCustomer,
        state.percentages,
        state.isBuyCrypto,
        "BUY"
      );

      return {
        ...state,
        currencyFromCustomerAmount: validate(action.payload.amount),
        currencyToCustomerAmount: newCurrencyToCustomerAmount,
        lastModifiedField: "FROM"
      };
    }

    case currencyActionTypes.CHANGE_CURRENCY_TO_CUSTOMER_AMOUNT: {
      const newCurrencyFromCustomerAmount = convertCurrency(
        action.payload.amount,
        state.currentCurrencyToCustomer,
        state.currentCurrencyFromCustomer,
        state.percentages,
        state.isBuyCrypto,
        "SALE"
      );

      return {
        ...state,
        currencyFromCustomerAmount: newCurrencyFromCustomerAmount,
        currencyToCustomerAmount: validate(action.payload.amount),
        lastModifiedField: "TO"
      };
    }

    case currencyActionTypes.SET_PERCANTAGES:
      return { ...state, percentages: action.payload.percentages };

    default:
      return state;
  }
};
