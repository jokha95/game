import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./redux-app/";
import { setName, place } from "./redux-app/actions";
import App from "./App.jsx";
import "./styles.css";

const store = createStore(reducer);
store.dispatch(setName("asdf"));
store.dispatch(setName("qwer"));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
