import React, { useRef, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../Spinner/Spinner";
import Modal from "../Modal/Modal";

import { RootState } from "../../store/store";
import * as scrollActions from "../../store/actions/scrollActions/scrollActionCreators";

import { scrollToNode } from "../../utils/ts/helperFunctions";

import "./Exchange.scss";

const Exchange: React.FC = () => {
  const dispatch = useDispatch();

  const exchangeSection = useRef<HTMLElement>(null!);
  const isMount = useRef(false);

  const scrollToExchange = useSelector((state: RootState) => state.scrollState.scrollToExchange);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isNumberValid, setIsNumberValid] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToContacts = useCallback(() => {
    dispatch(scrollActions.scrollToContacts());
  }, [dispatch]);

  const nameOnChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const numberOnChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []);

  const onFocusInput = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === "name") {
      setIsNameValid(true);
    } else {
      setIsNumberValid(true);
    }
  }, []);

  const sendData = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      let isFormValid = true;
      if (name.length === 0) {
        setIsNameValid(false);
        isFormValid = false;
      }
      if (number.length < 10) {
        setIsNumberValid(false);
        isFormValid = false;
      }
      if (!isFormValid) {
        return setIsLoading(false);
      }

      try {
        // const response = await fetch(
        //   `https://api.telegram.org/bot957327615:AAH0MITHU3soRisXfcZZmnHSgI9RqoqBTdo/sendMessage?chat_id=174294535&text=${name} - ${number} ждет звонок`
        // );
        const response = await fetch(
          `https://api.telegram.org/bot957327615:AAH0MITHU3soRisXfcZZmnHSgI9RqoqBTdo/sendMessage?chat_id=448641137&text=${name} - ${number} ждет звонок`
        );
        if (response.status !== 200) {
          setIsLoading(false);
          // return context.setIsError(true);
          return console.log("oops");
        }
        setName("");
        setNumber("");
        setIsLoading(false);
        setIsModalOpen(true);
      } catch (error) {
        setIsLoading(false);
        // return context.setIsError(true);
        return console.log("oops");
      }
    },
    [name, number]
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (isMount.current && exchangeSection.current) {
      scrollToNode(exchangeSection.current);
    }
    isMount.current = true;
  }, [scrollToExchange]);

  return (
    <>
      {isModalOpen ? <Modal closeModal={closeModal} text="данные отправлены" /> : null}
      <section className="exchange" ref={exchangeSection}>
        <div className="exchange__inner">
          <div className="exchange__desc">
            для обмена криптовалюты свяжитесь с нами по данным из{" "}
            <span className="exchange__contact-link" onClick={scrollToContacts}>
              контактов
            </span>{" "}
            или оставьте свои и мы вам перезвоним
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <form className="exchange__form" onSubmit={sendData}>
              <div className="exchange__inputs">
                <div className="exchange__form-group">
                  <input
                    type="text"
                    className={"exchange__input" + (isNameValid ? "" : " exchange__input_invalid")}
                    placeholder="имя"
                    autoComplete="off"
                    name="name"
                    value={name}
                    onChange={nameOnChange}
                    onFocus={onFocusInput}
                  />
                  {isNameValid ? null : <small>надо как-то себя назвать</small>}
                </div>
                <div className="exchange__form-group">
                  <input
                    type="tel"
                    className={
                      "exchange__input" + (isNumberValid ? "" : " exchange__input_invalid")
                    }
                    placeholder="телефон"
                    autoComplete="off"
                    name="number"
                    value={number}
                    onChange={numberOnChange}
                    onFocus={onFocusInput}
                  />
                  {isNumberValid ? null : <small>минимум 10 знаков</small>}
                </div>
              </div>
              <button type="submit" className="exchange__btn">
                перезвоните мне
              </button>
            </form>
          )}
          <p className="exchange__error">
            (если мы вам не перезваниваем, то, вероятно, вы ошиблись при указании номера. попробуйте
            еще раз)
          </p>
        </div>
      </section>
    </>
  );
};

export default Exchange;
