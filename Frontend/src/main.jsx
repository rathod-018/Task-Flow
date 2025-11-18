import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext.jsx";
import { BoardContextProvider } from "./context/BoardContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <BoardContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BoardContextProvider>
    </UserContextProvider>
  </StrictMode>
);
