import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";

import { App } from "./app.tsx";

export const FTree = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </MantineProvider>
  );
};
