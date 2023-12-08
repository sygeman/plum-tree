import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { NodeEditor } from "./components/node-editor";
import { Toolbar } from "./components/toolbar";
// import { PersonDetails } from "./components/tree/person-details";
import { Tree } from "./components/tree/tree";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <Tree />
      <Toolbar />
      {/* <PersonDetails /> */}
      <NodeEditor />
    </MantineProvider>
  </React.StrictMode>
);
