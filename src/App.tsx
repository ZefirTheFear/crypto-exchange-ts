import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import smoothscroll from "smoothscroll-polyfill";

import Home from "./pages/Home/Home";

smoothscroll.polyfill();
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
