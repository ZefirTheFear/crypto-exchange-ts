import React, { useContext } from "react";

import Context from "../../context";

import "./TableForCalc.scss";

const TableForCalc = ({ percentage }) => {
  const context = useContext(Context);

  const data = {
    header: ["сумма в $ эквиваленте", "прием криптовалюты, %", "продажа криптовалюты, %"]
  };

  const array = [];
  for (let item in percentage) {
    array.push(percentage[item]);
  }
  data.percentage = array;

  const formatBuyValue = val => {
    if (val > 0) {
      return `-${val}`;
    } else if (val === 0) {
      return `0`;
    } else if (val < 0) {
      return `+${-val}`;
    }
  };

  const formatSellValue = val => {
    if (val > 0) {
      return `+${val}`;
    } else if (val === 0) {
      return `0`;
    } else if (val < 0) {
      return `-${-val}`;
    }
  };

  return (
    <>
      <div className="table-for-calc">
        <div className="table-for-calc__inner">
          <div className="table-for-calc__currencies">
            <div className="table-for-calc__currencies-item">BTC: ${context.BTC}</div>
            <div className="table-for-calc__currencies-item">ETH: ${context.ETH}</div>
            <div className="table-for-calc__currencies-item">
              USD/UAH: {context.UAHBuy}/{context.UAHSale}
            </div>
          </div>
          <div className="table-for-calc__percentage">
            <div className="table-for-calc__header">
              {data.header.map(item => (
                <div className="table-for-calc__header-item" key={item}>
                  {item}
                </div>
              ))}
            </div>
            <div className="table-for-calc__body">
              {data.percentage.map(item => {
                return (
                  <div className="table-for-calc__body-row" key={item.amountFrom}>
                    <div className="table-for-calc__body-row-item">
                      {item.amountFrom} - {item.amountTo}
                    </div>
                    <div className="table-for-calc__body-row-item">
                      {formatBuyValue(item.percentBuy)}
                    </div>
                    <div className="table-for-calc__body-row-item">
                      {formatSellValue(item.percentSale)}
                    </div>
                  </div>
                );
              })}
              <div className="table-for-calc__footer">от $100 000 индивидуальные условия</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableForCalc;
