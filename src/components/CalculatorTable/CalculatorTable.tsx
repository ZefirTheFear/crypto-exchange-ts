import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import cloneDeep from "clone-deep";

import { RootState } from "../../store/store";

import "./CalculatorTable.scss";

const CalculatorTable: React.FC = () => {
  const percentages = useSelector((state: RootState) => state.currenciesState.percentages);
  const currenciesFrom = useSelector(
    (state: RootState) => state.currenciesState.currenciesFromCustomer
  );
  const currenciesTo = useSelector(
    (state: RootState) => state.currenciesState.currenciesToCustomer
  );
  const currencies = cloneDeep([...currenciesFrom, ...currenciesTo]);

  const headerTableCurrencies = useMemo(() => {
    return [
      `BTC: $${currencies.find((currency) => currency.name === "BTC")!.valueBuy}`,
      `ETH: $${currencies.find((currency) => currency.name === "ETH")!.valueBuy}`,
      `USD/UAH: ${(1 / currencies.find((currency) => currency.name === "UAH")!.valueBuy).toFixed(
        2
      )}/${(1 / currencies.find((currency) => currency.name === "UAH")!.valueSale).toFixed(2)}`
    ];
  }, [currencies]);

  const headerTablePercentages = useMemo(() => {
    return ["сумма в $ эквиваленте", "прием криптовалюты, %", "продажа криптовалюты, %"];
  }, []);

  const formatValue = useCallback((val: number) => {
    if (val > 0) {
      return `+${val}`;
    } else {
      return `${val}`;
    }
  }, []);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {headerTableCurrencies.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
      </table>
      <table className="table">
        <thead>
          <tr>
            {headerTablePercentages.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {percentages.map((percentage) => (
            <tr key={percentage.amountFrom}>
              <td>
                {percentage.amountFrom} - {percentage.amountTo}
              </td>
              <td>{formatValue(percentage.percentBuyCrypto)}</td>
              <td>{formatValue(percentage.percentSaleCrypto)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3}>
              от ${percentages[percentages.length - 1].amountTo + 1} индивидуальные условия
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CalculatorTable;
