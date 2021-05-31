import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
const ToastContext = React.createContext();

export function useToast() {
  return useContext(ToastContext);
}

export const ToastProvider = ({ children }) => {
  const showToast = (text, delay = 5000, type, setState) => {
    toast[type](text, {
      position: "top-center",
      autoClose: delay,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    if (type === "error") setState("");
    if (type === "success") setState("");
  };

  const value = {
    showToast,
  };
  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ToastContext.Provider>
  );
};
