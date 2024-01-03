import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/alert";
import "../../../src/elements/button";
import "../../../src/elements/container";
import { Container } from "../../../src/elements/container";
import "../../../src/elements/icon";
import "../../../src/elements/image";
import { AutoLitProperty, baseArgsTypes } from "../helper";
type ContainerWithLabel = AutoLitProperty<Container>;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Container",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html` <style>
        div.background {
          background-image: url("https://images.unsplash.com/photo-1487260211189-670c54da558d?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
          background-size: cover;
          padding: 100px;
          height: 100vh;
          width: auto;
        }
      </style>

      <div class="background">
        <ssk-container ${spread(args)}>
          <ssk-image
            src="https://fastly.picsum.photos/id/962/200/200.jpg?hmac=XehF7z9JYkgC-2ZfSP05h7eyumIq9wNKUDoCLklIhr4"
            fallbackSrc="https://placehold.co/200x200"
          ></ssk-image>

          <ssk-alert
            type="info"
            message="This is a message"
            topic="This is a topic"
          >
            <ssk-icon
              name="outline-information-circle"
              themeColor="danger"
              slot="icon-slot"
            ></ssk-icon>
            <ssk-button
              themeColor="gray"
              padding="sm"
              variant="ghost"
              slot="close-button-slot"
            >
              <ssk-icon
                slot="postfix"
                size="sm"
                name="outline-ellipsis-horizontal-circle"
                size="md"
              ></ssk-icon>
              Dismiss
            </ssk-button>
            <ssk-button padding="sm" variant="ghost" slot="ok-button-slot">
              <ssk-icon
                slot="postfix"
                size="sm"
                name="outline-ellipsis-horizontal-circle"
                size="md"
              ></ssk-icon>
              View changes
            </ssk-button>
          </ssk-alert>
        </ssk-container>
        <div></div>
      </div>`;
  },
  argTypes: {
    ...baseArgsTypes,
  },
} satisfies Meta<ContainerWithLabel>;

export default meta;

type Story = StoryObj<ContainerWithLabel>;

export const BasicContainer: Story = {
  args: {
    themeColor: "background",
  },
};
