import { Dispatch } from "redux";

import { scrollActionType } from "./../../store/actions/scrollActions/scrollActionTypes";
import * as scrollActions from "../../store/actions/scrollActions/scrollActionCreators";
import * as mobileMenuActions from "../../store/actions/mobileMenuActions/mobileMenuActionCreators";

const onClick = (action: scrollActionType, dispatch: Dispatch<any>) => {
  dispatch(mobileMenuActions.closeMobileMenu());
  dispatch(action);
};

export default (dispatch: Dispatch<any>) => [
  {
    title: "калькулятор",
    onClick: () => {
      onClick(scrollActions.scrollToCalc(), dispatch);
    }
  },
  {
    title: "обмен",
    onClick: () => {
      onClick(scrollActions.scrollToExchange(), dispatch);
    }
  },
  {
    title: "о нас",
    onClick: () => {
      onClick(scrollActions.scrollToAboutUs(), dispatch);
    }
  },
  {
    title: "контакты",
    onClick: () => {
      onClick(scrollActions.scrollToContacts(), dispatch);
    }
  }
];
