import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "normalize.css";
import "react-toastify/dist/ReactToastify.css";

import "./common/styles/app.scss";
import Layout from "./components/Layout";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
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
);
