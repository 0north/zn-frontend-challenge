import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { worker } from "../mocks/browser";
import "./index.css";
import App from "./app.tsx";

worker
  .start({
    onUnhandledRequest: "bypass",
  })
  .then(() => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });
