import type { Meta, StoryObj } from "@storybook/react";

import { Tree } from "./tree";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  component: Tree,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1f1f1f" }],
    },
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  title: "Tree",
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    label: "Tree",
    primary: true,
  },
};
