import React, { useCallback } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";

import * as scrollActions from "../../store/actions/scrollActions/scrollActionCreators";

import "./Attension.scss";

interface AttensionProps {
  closeAttention: () => void;
}

const Attension: React.FC<AttensionProps> = ({ closeAttention }) => {
  const dispatch = useDispatch();

  const scrollToContacts = useCallback(() => {
    dispatch(scrollActions.scrollToContacts());
  }, [dispatch]);

  return (
    <>
      <div className="attention">
        <div className="attention__inner">
          <div className="attention__main">
            для предотвращения случаев мошенничества используйте для связи только{" "}
            <span className="attention__inner-contacts-link" onClick={scrollToContacts}>
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
