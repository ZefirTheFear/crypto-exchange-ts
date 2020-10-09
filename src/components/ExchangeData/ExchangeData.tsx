import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FaAngleDown } from "react-icons/fa";

import { Currency } from "../../models/currency";
import { RootState } from "../../store/store";
import * as currencyActions from "../../store/actions/currencyActions/currencyActionCreators";

import "./ExchangeData.scss";

interface ExchangeDataProps {
  status: "sale" | "buy";
  title: string;
  options: Currency[];
  currentCurrency: Currency;
  value: string;
  onChangeInputAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExchangeData: React.FC<ExchangeDataProps> = ({
  status,
  title,
  options,
  currentCurrency,
  value,
  onChangeInputAmount
}) => {
  const dispatch = useDispatch();

  const closeOptions = useSelector((state: RootState) => state.currenciesState.closeOptions);

  const sectionsListElem = useRef<HTMLDivElement>(null!);
  const isMount = useRef(false);

  const [isOpenedOptions, setIsOpenedOptions] = useState(false);

  const toggleIsOpenedOptions = useCallback(() => {
    const elem = sectionsListElem.current;
    const computedStyle = getComputedStyle(elem);
    if (isOpenedOptions) {
      elem.style.height = "0";
      elem.style.marginTop = "";
    } else {
      elem.style.height =
        elem.scrollHeight +
        parseInt(computedStyle.borderTopWidth, 10) +
        parseInt(computedStyle.borderBottomWidth, 10) +
        "px";
      elem.style.marginTop = "0.5rem";
    }

    setIsOpenedOptions((prevState) => !prevState);
  }, [isOpenedOptions]);

  const closeCurrenciesOptions = useCallback(() => {
    const elem = sectionsListElem.current;
    elem.style.height = "0";
    elem.style.marginTop = "";
    setIsOpenedOptions(false);
  }, []);

  const selectCurrency = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const currencyName = e.currentTarget.getAttribute("data-name")!;
      const newSelectedCurrency = options.find((currency) => currency.name === currencyName)!;
      if (status === "buy") {
        dispatch(currencyActions.setCurrentCurrencyFromCustomer(newSelectedCurrency));
      } else {
        dispatch(currencyActions.setCurrentCurrencyToCustomer(newSelectedCurrency));
      }
      toggleIsOpenedOptions();
    },
    [dispatch, options, status, toggleIsOpenedOptions]
  );

  useEffect(() => {
    if (isMount.current) {
      closeCurrenciesOptions();
    }
    isMount.current = true;
  }, [closeOptions, closeCurrenciesOptions]);

  return (
    <div className="exchange-data">
      <div className="exchange-data__title">{title}</div>
      <div className="exchange-data__selector">
        <div className="exchange-data__selected" onClick={toggleIsOpenedOptions}>
          <img
            className="exchange-data__currency-img"
            src={currentCurrency.img}
            alt={currentCurrency.name + "-logo"}
          />
          <span className="exchange-data__currency-name">{currentCurrency.name}</span>
          <span
            className={
              "exchange-data__select-arrow" +
              (isOpenedOptions ? " exchange-data__select-arrow_is-opened" : "")
            }
          >
            <FaAngleDown />
          </span>
        </div>
        <div className="exchange-data__select-options" ref={sectionsListElem}>
          {options.map((item) => (
            <div
              className="exchange-data__select-options-item"
              key={item.name}
              data-name={item.name}
              onClick={selectCurrency}
            >
              <img
                className="exchange-data__currency-img"
                src={item.img}
                alt={item.name + "-logo"}
              />
              <span className="exchange-data__currency-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <input
        type="number"
        placeholder="0.00"
        className="exchange-data__input"
        value={value}
        onChange={onChangeInputAmount}
      />
    </div>
  );
};

export default ExchangeData;
