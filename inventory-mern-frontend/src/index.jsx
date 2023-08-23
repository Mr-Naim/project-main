import { StrictMode } from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import store from "./redux/store/store";
import "./assets/css/bootstrap.css";
import "./assets/css/style.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
      <Provider store={store}>
        <App/>
        <script src="https://cdn.botpress.cloud/webchat/v0/inject.js"></script>
        <script src="https://mediafiles.botpress.cloud/c998d013-8cb4-4e1d-b40d-657392db6812/webchat/config.js" defer></script>
      </Provider>
  </StrictMode>
);
