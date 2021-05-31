import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import { ChatProvider } from "./contexts/ChatContext";
import "./index.css";
ReactDOM.render(
  <>
    <AuthProvider>
      <ToastProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </ToastProvider>
    </AuthProvider>
  </>,
  document.getElementById("root")
);
