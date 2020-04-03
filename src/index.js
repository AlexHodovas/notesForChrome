import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import App from "./App";
import "./styles.scss";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <DndProvider backend={Backend}>
        <App />
      </DndProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);