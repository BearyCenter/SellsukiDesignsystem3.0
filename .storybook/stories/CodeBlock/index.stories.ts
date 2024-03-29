import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/alert";
import "../../../src/elements/button";
import "../../../src/elements/codeblock";
import { CodeBlock } from "../../../src/elements/codeblock";
import "../../../src/elements/icon";
import "../../../src/elements/image";
import { AutoLitProperty, baseArgsTypes } from "../helper";
type CodeBlockWithLabel = AutoLitProperty<CodeBlock>;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/CodeBlock",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html` <style>
       
      </style>

      <div class="background">
        <ssk-code-block ${spread(args)}>
        <h1>test h1</h1>
        </ssk-code-block>
        <div></div>
      </div>`;
  },
  argTypes: {
    ...baseArgsTypes,
  },
} satisfies Meta<CodeBlockWithLabel>;

export default meta;

type Story = StoryObj<CodeBlockWithLabel>;

export const BasicCodeBlock: Story = {
  args: {
    themeColor: "background",
  },
};
