import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/image";
import { Image } from "../../../src/elements/image";
import { baseArgsTypes } from "../helper";

type ImageArgs = {} & Image;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Components/Media & Branding/Image",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-image ${spread(args)}></ssk-image>`;
  },
  argTypes: {
    src: {
      control: {
        type: "text",
      },
    },
    fallbackSrc: {
      control: {
        type: "text",
      },
    },
    alt: {
      control: {
        type: "text",
      },
    },
    boxSize: {
      control: {
        type: "text",
      },
    },
    objectFit: {
      options: ["fill", "contain", "cover", "none", "scale-down"],
      control: {
        type: "select",
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<ImageArgs>;

export default meta;

type Story = StoryObj<ImageArgs>;

export const Default: Story = {
  args: {
    src: "https://fastly.picsum.photos/id/216/200/300.jpg?hmac=c3OXbiUxWPMgwnaFpX8ZAfBL5TZzWjnof6mb4OwuSPs",
    alt: "demo image",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=801-59140",
    },
  },
};

export const FallbackImage: Story = {
  args: {
    src: "https://example.com/404.jpg",
    fallbackSrc: "https://placehold.co/200x300",
    alt: "demo image",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=801-59140",
    },
  },
};
