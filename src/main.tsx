import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./layout";
import "./main.css";
import { IndexPage } from "./routes/index";
import { PersonEditor } from "./routes/trees/person-editor";
import { PersonLinker } from "./routes/trees/person-linker";
import { TreeDetails } from "./routes/trees/tree-details";
import { TreeEditor } from "./routes/trees/tree-editor";
import { TreePeople } from "./routes/trees/tree-people";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <Layout>
          <Routes>
            <Route element={<IndexPage />} path="/" />
            <Route element={<TreeDetails />} path="/trees/create" />
            <Route element={<TreeEditor />} path="/trees/:treeId" />
            <Route element={<TreeDetails />} path="/trees/:treeId/details" />
            <Route element={<TreePeople />} path="/trees/:treeId/people" />
            <Route
              element={<PersonEditor />}
              path="/trees/:treeId/people/add"
            />
            <Route
              element={<PersonEditor />}
              path="/trees/:treeId/people/:personId"
            />
            <Route
              element={<PersonLinker />}
              path="/trees/:treeId/people/:personId/link"
            />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
