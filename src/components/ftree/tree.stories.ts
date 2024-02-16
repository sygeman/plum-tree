import type { Meta, StoryObj } from "@storybook/react";

import { FTree } from "./ftree";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  component: FTree,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1f1f1f" }],
    },
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  title: "Tree2",
} satisfies Meta<typeof FTree>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    label: "FTree",
    primary: true,
  },
};
