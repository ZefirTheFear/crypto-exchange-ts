import { Dispatch } from "redux";

import { ScrollActionType } from "./../../store/actions/scrollActions/scrollActionTypes";
import * as scrollActions from "../../store/actions/scrollActions/scrollActionCreators";
import * as mobileMenuActions from "../../store/actions/mobileMenuActions/mobileMenuActionCreators";

const onClick = (action: ScrollActionType, dispatch: Dispatch) => {
  dispatch(mobileMenuActions.closeMobileMenu());
  dispatch(action);
};

export default (dispatch: Dispatch) => [
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
