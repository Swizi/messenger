import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./pages/Login";
import { Chat } from "./pages/Chat";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {/* <Route
            exact
            path="/"
            header="Сообщения"
            render={() => (
                <Chat />
            )}
          />{" "} */}
          <Route
            exact
            path="/"
            header="Вход"
            render={() => (
                <Login />
            )}
          />{" "}
        </Switch>{" "}
      </div>{" "}
    </BrowserRouter>
  );
}

export default App;
