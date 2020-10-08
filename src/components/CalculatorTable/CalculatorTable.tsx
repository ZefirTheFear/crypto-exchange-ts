import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
// import cloneDeep from "clone-deep";

import { RootState } from "../../store/store";

import "./CalculatorTable.scss";

const TableForCalc: React.FC = () => {
  const percentages = useSelector((state: RootState) => state.currenciesState.percentages);
  const currencies = useSelector((state: RootState) => [
    ...state.currenciesState.currenciesFromCustomer,
    ...state.currenciesState.currenciesToCustomer
  ]);
  // const currenciesFrom = useSelector(
  //   (state: RootState) => state.currenciesState.currenciesFromCustomer
  // );
  // const currenciesTo = useSelector(
  //   (state: RootState) => state.currenciesState.currenciesToCustomer
  // );
  // const currencies = cloneDeep([...currenciesFrom, ...currenciesTo]);

  // console.log(currencies);

  const data = useMemo(() => {
    return {
      header: ["сумма в $ эквиваленте", "прием криптовалюты, %", "продажа криптовалюты, %"]
    };
  }, []);

  const formatValue = useCallback((val: number) => {
    if (val > 0) {
      return `+${val}`;
    } else {
      return `${val}`;
    }
  }, []);

  return (
    <div className="table-for-calc">
      <div className="table-for-calc__inner">
        <div className="table-for-calc__currencies">
          <div className="table-for-calc__currencies-item">
            BTC: ${currencies.find((currency) => currency.name === "BTC")!.valueBuy}
          </div>
          <div className="table-for-calc__currencies-item">
            ETH: ${currencies.find((currency) => currency.name === "ETH")!.valueBuy}
          </div>
          <div className="table-for-calc__currencies-item">
            USD/UAH:{" "}
            {(1 / currencies.find((currency) => currency.name === "UAH")!.valueBuy).toFixed(2)}/
            {(1 / currencies.find((currency) => currency.name === "UAH")!.valueSale).toFixed(2)}
          </div>
        </div>
        <div className="table-for-calc__percentage">
          <div className="table-for-calc__header">
            {data.header.map((item) => (
              <div className="table-for-calc__header-item" key={item}>
                {item}
              </div>
            ))}
          </div>
          <div className="table-for-calc__body">
            {percentages.map((item) => {
              return (
                <div className="table-for-calc__body-row" key={item.amountFrom}>
                  <div className="table-for-calc__body-row-item">
                    {item.amountFrom} - {item.amountTo}
                  </div>
                  <div className="table-for-calc__body-row-item">
                    {formatValue(item.percentBuyCrypto)}
                  </div>
                  <div className="table-for-calc__body-row-item">
                    {formatValue(item.percentSaleCrypto)}
                  </div>
                </div>
              );
            })}
            <div className="table-for-calc__footer">
              от ${percentages[percentages.length - 1].amountTo + 1} индивидуальные условия
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableForCalc;
