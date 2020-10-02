import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "./pages/Home/Home";
import Article from "./pages/Article/Article";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/obmen-kriptovalyut" component={Article} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
