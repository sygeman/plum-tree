import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Layout } from "./components/layout";

import "./main.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <ToastContainer
          autoClose={8000}
          position={toast.POSITION.TOP_CENTER}
          toastClassName="alert"
        />
        <Routes>
          <Route path="/*" element={<Layout />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
