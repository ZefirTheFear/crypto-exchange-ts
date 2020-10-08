import { Currency } from "./../../models/currency";
import { Percentage } from "./../../store/actions/currencyActions/currencyActionTypes";

import globalStyles from "../../utils/css/_variables.scss";

export const validate = (value: string) => {
  if (+value < 0) {
    return (+value * -1).toString();
  } else {
    return value;
  }
};

export const convertCurrency = (
  amount: string,
  inputFieldCurrency: Currency,
  outputFieldCurrency: Currency,
  percentages: Percentage[],
  isBuyCrypto: boolean,
  operationType: "BUY" | "SALE"
) => {
  if (amount === "") {
    return "";
  }
  const totalValue =
    +validate(amount) *
    (operationType === "BUY" ? inputFieldCurrency.valueBuy : inputFieldCurrency.valueSale);
  const outputCurrencyValue =
    operationType === "BUY" ? outputFieldCurrency.valueSale : outputFieldCurrency.valueBuy;
  let percentage =
    percentages.find(
      (percentage) => totalValue >= percentage.amountFrom && totalValue <= percentage.amountTo
    ) || percentages[percentages.length - 1];

  let convertedValue = "";
  if (isBuyCrypto && operationType === "BUY") {
    convertedValue = (
      (totalValue * ((100 + percentage.percentBuyCrypto) / 100)) /
      outputCurrencyValue
    )
      .toFixed(2)
      .toString();
  }
  if (isBuyCrypto && operationType === "SALE") {
    convertedValue = (
      totalValue /
      (outputCurrencyValue * ((100 + percentage.percentBuyCrypto) / 100))
    )
      .toFixed(4)
      .toString();
  }
  if (!isBuyCrypto && operationType === "BUY") {
    convertedValue = (
      totalValue /
      (outputCurrencyValue * ((100 + percentage.percentSaleCrypto) / 100))
    )
      .toFixed(4)
      .toString();
  }
  if (!isBuyCrypto && operationType === "SALE") {
    convertedValue = (
      (totalValue * ((100 + percentage.percentSaleCrypto) / 100)) /
      outputCurrencyValue
    )
      .toFixed(2)
      .toString();
  }
  return convertedValue;
};

export const scrollToNode = (node: HTMLElement) => {
  const headerOffset = parseInt(globalStyles.headerHeight);
  window.scrollTo({
    top: window.pageYOffset + node.getBoundingClientRect().top - headerOffset,
    behavior: "smooth"
  });
};
