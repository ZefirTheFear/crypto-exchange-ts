import { createStore, combineReducers } from "redux";

import currenciesReducer from "./reducers/currenciesReducer";
import menuReducer from "./reducers/menuReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const rootReducer = combineReducers({
  currenciesState: currenciesReducer,
  menuState: menuReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
);

export default store;
