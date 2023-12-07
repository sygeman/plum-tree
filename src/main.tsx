import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";

import "./main.css";
import { TreeEditor } from "./routes/trees/tree-editor";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <div className="absolute w-full inset-0 overflow-hidden">
        <TreeEditor />
      </div>
    </MantineProvider>
  </React.StrictMode>
);
