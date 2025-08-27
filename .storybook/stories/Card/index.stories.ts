import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/card";
import { Card } from "../../../src/components/card";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type CardComponentArgs = AutoLitProperty<Card> & { label: string };

const meta: Meta<Card> = {
  title: "Example/Card",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`
      <ssk-card " 
      ${spread({ ...args })}
      >
      </ssk-card>
    `;
  },
  argTypes: {
    
  },
};

export default meta;

type Story = StoryObj<Card>;

export const DefaultMedium: Story = {
  args: {
    
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/",
    },
  },
};