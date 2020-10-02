import React, { useState, useContext } from "react";

import Spinner from "../Spinner/Spinner";
import Modal from "../Modal/Modal";
import Context from "../../context";

import "./Exchange.scss";

const Exchange = () => {
  const context = useContext(Context);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isNumberValid, setIsNumberValid] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nameOnChange = e => {
    setName(e.target.value);
  };

  const numberOnChange = e => {
    setNumber(e.target.value);
  };

  const sendData = async e => {
    setIsLoading(true);
    e.preventDefault();
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
      const response = await fetch(
        `https://api.telegram.org/bot957327615:AAH0MITHU3soRisXfcZZmnHSgI9RqoqBTdo/sendMessage?chat_id=174294535&text=${name} - ${number} ждет звонок`
      );
      // const response = await fetch(
      //   `https://api.telegram.org/bot957327615:AAH0MITHU3soRisXfcZZmnHSgI9RqoqBTdo/sendMessage?chat_id=448641137&text=${name} - ${number} ждет звонок`
      // );
      if (response.status !== 200) {
        setIsLoading(false);
        return context.setIsError(true);
      }
      setIsLoading(false);
      setIsModalOpen(true);
    } catch (error) {
      setIsLoading(false);
      context.setIsError(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen ? <Modal closeModal={closeModal} text="данные отправлены" /> : null}
      <section className="exchange">
        <div className="exchange__inner">
          <div className="exchange__desc">
            для обмена криптовалюты свяжитесь с нами по данным из{" "}
            <span
              className="exchange__contact-link"
              onClick={() => {
                context.scrollTo(document.querySelector(".contacts"));
              }}
            >
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
                    value={name}
                    onChange={nameOnChange}
                    onFocus={() => setIsNameValid(true)}
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
                    value={number}
                    onChange={numberOnChange}
                    onFocus={() => setIsNumberValid(true)}
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
