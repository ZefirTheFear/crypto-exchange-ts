import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FaExchangeAlt } from "react-icons/fa";

import Spinner from "../Spinner/Spinner";
import ExchangeData from "../ExchangeData/ExchangeData";

import { RootState } from "../../store/store";
import * as currencyActions from "../../store/actions/currencyActions/currencyActionCreators";

import { scrollToNode } from "../../utils/ts/helperFunctions";

import ImgBTC from "../../assets/img/BTC.png";
import ImgETH from "../../assets/img/ETH.png";
import ImgUSDT from "../../assets/img/usdt.png";
import ImgUSD from "../../assets/img/usd.png";
import ImgUAH from "../../assets/img/uah.png";

import "./Calculator.scss";
import TableForCalc from "../CalculatorTable/CalculatorTable";
import { Currency } from "../../models/currency";

const Calculator: React.FC = () => {
  const dispatch = useDispatch();

  const calcSection = useRef<HTMLElement>(null!);

  const currenciesFromCustomer = useSelector(
    (state: RootState) => state.currenciesState.currenciesFromCustomer
  );
  const currenciesToCustomer = useSelector(
    (state: RootState) => state.currenciesState.currenciesToCustomer
  );
  const currentCurrencyFromCustomer = useSelector(
    (state: RootState) => state.currenciesState.currentCurrencyFromCustomer
  );
  const currentCurrencyToCustomer = useSelector(
    (state: RootState) => state.currenciesState.currentCurrencyToCustomer
  );
  const currencyFromCustomerAmount = useSelector(
    (state: RootState) => state.currenciesState.currencyFromCustomerAmount
  );
  const currencyToCustomerAmount = useSelector(
    (state: RootState) => state.currenciesState.currencyToCustomerAmount
  );

  const scrollToCalc = useSelector((state: RootState) => state.scrollState.scrollToCalc);

  const [isFetchingBinanceData, setIsFetchingBinanceData] = useState(true);
  const [isFetchingOwnData, setIsFetchingOwnData] = useState(true);

  const changeCurrencyFromCustomerAmount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(currencyActions.changeCurrencyFromCustomerAmount(event.currentTarget.value));
    },
    [dispatch]
  );

  const changeCurrencyToCustomerAmount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(currencyActions.changeCurrencyToCustomerAmount(event.currentTarget.value));
    },
    [dispatch]
  );

  const fetchBinanceData = useCallback(async () => {
    try {
      const response = await fetch("https://apiv2.bitcoinaverage.com/exchanges/ticker/binance", {
        headers: {
          "x-ba-key": "MjY4ZmJkNGFiNzJkNDJjNzg4NjkwNDE5NzE2NDMxZGU"
        }
      });
      if (response.status !== 200) {
        // return context.setIsError(true);
        return console.log("oops");
      }
      // let resData: {
      //   symbols: { BTCUSDT: { bid: number }; ETHUSDT: { bid: number } };
      // } = await response.json();
      let resData = await response.json();
      console.log(resData);
      const newCurrenciesFromCustomer: Currency[] = [
        {
          name: "BTC",
          valueBuy: resData.symbols.BTCUSDT.bid,
          valueSale: resData.symbols.BTCUSDT.bid,
          img: ImgBTC
        },
        {
          name: "ETH",
          valueSale: resData.symbols.ETHUSDT.bid,
          valueBuy: resData.symbols.ETHUSDT.bid,
          img: ImgETH
        },
        {
          name: "USDT",
          valueSale: 1,
          valueBuy: 1,
          img: ImgUSDT
        }
      ];
      dispatch(currencyActions.setCurrenciesFromCustomer(newCurrenciesFromCustomer));
      dispatch(
        currencyActions.setCurrentCurrencyFromCustomer({
          name: "BTC",
          img: ImgBTC,
          valueSale: resData.symbols.BTCUSDT.bid,
          valueBuy: resData.symbols.BTCUSDT.bid
        })
      );
      setIsFetchingBinanceData(false);
    } catch (error) {
      // context.setIsError(true);
      return console.log("oops");
    }
  }, [dispatch]);

  const fetchOwnData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://exchange-currencies-obolon.firebaseio.com/currencies.json`
      );
      if (response.status !== 200) {
        // return context.setIsError(true);
        return console.log("oops");
      }
      let resData = await response.json();
      console.log(resData);
      const newCurrenciesToCustomer: Currency[] = [
        {
          name: "USD",
          valueSale: 1,
          valueBuy: 1,
          img: ImgUSD
        },
        {
          name: "UAH",
          valueSale: 1 / resData.usd.buy.rate,
          valueBuy: 1 / resData.usd.sell.rate,
          img: ImgUAH
        }
      ];
      dispatch(currencyActions.setCurrenciesToCustomer(newCurrenciesToCustomer));
      // dispatch(currencyActions.setPercentages(Object.values(resData.cryptoPercentage)));
      setIsFetchingOwnData(false);
    } catch (error) {
      // context.setIsError(true);
      return console.log("oops");
    }
  }, [dispatch]);

  const swapCurrencies = useCallback(() => {
    dispatch(currencyActions.swapCurrencies());
  }, [dispatch]);

  useEffect(() => {
    fetchBinanceData();
    fetchOwnData();
  }, [fetchBinanceData, fetchOwnData]);

  useEffect(() => {
    if (calcSection.current) {
      scrollToNode(calcSection.current);
    }
  }, [scrollToCalc]);

  if (isFetchingBinanceData || isFetchingOwnData) {
    return (
      <section className="calculator-section">
        <div className="calculator-section__inner">
          <Spinner />
        </div>
      </section>
    );
  }

  return (
    <section className="calculator-section" ref={calcSection}>
      <div className="calculator-section__inner">
        <div className="calculator">
          <ExchangeData
            status="buy"
            title="вы отдаете"
            options={currenciesFromCustomer}
            currentCurrency={currentCurrencyFromCustomer}
            value={currencyFromCustomerAmount}
            onChangeInputAmount={changeCurrencyFromCustomerAmount}
          />
          <div className="calculator__swaper" onClick={swapCurrencies}>
            <FaExchangeAlt />
          </div>
          <ExchangeData
            status="sale"
            title="вы получаете"
            options={currenciesToCustomer}
            currentCurrency={currentCurrencyToCustomer}
            value={currencyToCustomerAmount}
            onChangeInputAmount={changeCurrencyToCustomerAmount}
          />
        </div>
        <TableForCalc />
      </div>
    </section>
  );
};

export default Calculator;
