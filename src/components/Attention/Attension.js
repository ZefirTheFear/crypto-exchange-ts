import React, { useContext } from "react";
import { IoIosCloseCircle } from "react-icons/io";

import Context from "../../context";

import "./Attension.scss";

const Attension = ({ closeAttention }) => {
  const context = useContext(Context);

  return (
    <>
      <div className="attention">
        <div className="attention__inner">
          <div className="attention__main">
            для предотвращения случаев мошенничества используйте для связи только{" "}
            <span
              className="attention__inner-contacts-link"
              onClick={() => {
                context.scrollTo(document.querySelector(".contacts"));
              }}
            >
              контакты
            </span>
            , указанные у нас на сайте
            {/* <span
            className="attention__inner-contacts-link"
            onClick={() => window.open("https://t.me/cryptotradekyiv")}
          >
            канале Telegram
          </span> */}
          </div>
          <div className="attention__close" onClick={closeAttention}>
            <IoIosCloseCircle />
          </div>
        </div>
      </div>
    </>
  );
};

export default Attension;
