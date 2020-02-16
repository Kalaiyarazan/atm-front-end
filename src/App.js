import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/home"} component={Home} /> />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
