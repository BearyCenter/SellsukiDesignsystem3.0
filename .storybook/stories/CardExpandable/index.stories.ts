import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/card-expandable";
import { ExpandableCard } from "../../../src/components/card-expandable";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type CardExpandableComponentArgs = AutoLitProperty<ExpandableCard> & { label: string };

const meta: Meta<ExpandableCard> = {
  title: "Example/CardExpandable",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`
    <h2>Card Expandable</h2>
      <div 
        style="
          display: grid;
          grid-template-columns: 1fr 1fr;"
        >
      
        <h2>-- Header Expandable --</h2>
        <h2>-- Header Expandable --</h2>
          <ssk-expandable-card
              variant="outlined"
              type="expand-header"
              title="Text 1"
              subtitle="Text 2"
          >
            <div slot="expand" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
              <ssk-text size="md" fontWeight="medium">Content</ssk-text>
            </div>
          </ssk-expandable-card>
          <ssk-expandable-card
              variant="elevated"
              type="expand-header"
              title="Text 1"
              subtitle="Text 2"
          >
            <div slot="expand" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
              <ssk-text size="md" fontWeight="medium">Content</ssk-text>
            </div>
          </ssk-expandable-card>

        <h2>-- Expand from header-Outlined-Loading --</h2>
        <h2>-- Expand from header-Elevated-Loading --</h2>
          <ssk-expandable-card
              variant="outlined"
              type="expand-header"
              loading
          >
          </ssk-expandable-card>

          <ssk-expandable-card
              variant="elevated"
              type="expand-header"
              loading
          >
          </ssk-expandable-card>

          <ssk-expandable-card
              variant="outlined"
              type="expand-header"
              title="Text 1"
              subtitle="Text 2"
          >
            <div slot="header" style="width: 100%; height: 100%; display:flex; align-items:center; justify-content:center; background:#eef; ">
              <ssk-icon name="solid-cube"></ssk-icon>
            </div>
            <div slot="expand" style="display: flex; flex-direction: column; gap: 12px;">
              <ssk-skeleton width="180px" skeletonshape="capsule" height="" size="md"></ssk-skeleton>
              <ssk-skeleton width="240px" skeletonshape="capsule" height="" size="md"></ssk-skeleton>
            </div>
          </ssk-expandable-card>

          <ssk-expandable-card
              variant="elevated"
              type="expand-header"
              title="Text 1"
              subtitle="Text 2"
          >
            <div slot="header" style="width: 100%; height: 100%; display:flex; align-items:center; justify-content:center; background:#eef; ">
              <ssk-icon name="solid-cube"></ssk-icon>
            </div>
            <div slot="expand" style="display: flex; flex-direction: column; gap: 12px;">
              <ssk-skeleton width="180px" skeletonshape="capsule" height="" size="md"></ssk-skeleton>
              <ssk-skeleton width="240px" skeletonshape="capsule" height="" size="md"></ssk-skeleton>
            </div>
          </ssk-expandable-card>

          <h2>-- Expand from footer-Outlined-Default --</h2>
          <h2>-- Expand from footer-Elevated-Default --</h2>

          <ssk-expandable-card
              variant="outlined"
              type="expand-footer"
          >
            <div slot="content" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
              <ssk-text size="md" fontWeight="medium">Content</ssk-text>
            </div>
            <div slot="expand" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
              <ssk-text size="md" fontWeight="medium">expand</ssk-text>
            </div>
          </ssk-expandable-card>
          
          <ssk-expandable-card
              variant="elevated"
              type="expand-footer"
          >
            <div slot="content" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
              <ssk-text size="md" fontWeight="medium">Content</ssk-text>
            </div>
            <div slot="expand" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
              <ssk-text size="md" fontWeight="medium">expand</ssk-text>
            </div>
          </ssk-expandable-card>

          <h2>-- Expand from footer-Outlined-Loading --</h2>
          <h2>-- Expand from footer-Elevated-Loading --</h2>

          <ssk-expandable-card
            variant="outlined"
            type="expand-footer"
            loading
          >
          </ssk-expandable-card>

          <ssk-expandable-card
            variant="elevated"
            type="expand-footer"
            loading
          >
          </ssk-expandable-card>

          <h2>--------</h2>
          <h2>--------</h2>

          <ssk-expandable-card
            variant="outlined"
            type="expand-footer"
          >
            <div slot="content" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
              <ssk-text size="md" fontWeight="medium">Content</ssk-text>
            </div>
            <div slot="expand" style="display: flex; flex-direction: column; gap: 12px;">
              <ssk-skeleton width="180px" skeletonshape="capsule" height="" size="md"></ssk-skeleton>
              <ssk-skeleton width="240px" skeletonshape="capsule" height="" size="md"></ssk-skeleton>
            </div>
          </ssk-expandable-card>

          <ssk-expandable-card
            variant="elevated"
            type="expand-footer"
          >
            <div slot="content" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
              <ssk-text size="md" fontWeight="medium">Content</ssk-text>
            </div>
            <div slot="expand" style="display: flex; flex-direction: column; gap: 12px;">
              <ssk-skeleton width="180px" skeletonshape="capsule" height="" size="md"></ssk-skeleton>
              <ssk-skeleton width="240px" skeletonshape="capsule" height="" size="md"></ssk-skeleton>
            </div>
          </ssk-expandable-card>
    </div>
    `;
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["outlined", "elevated"],
      table: {
        defaultValue: { summary: "card" },
      },
    },
    // type: {
    //   control: { type: "select" },
    //   options: ["stacked", "horizontal"],
    //   table: {
    //     defaultValue: { summary: "stacked" },
    //   },
    // },
    // title: {
    //   control: { type: "text" },
    //   defaultValue: "Product name Product name Product name",
    //   description: "The title of the card",
    // },
    // subtitle: {
    //   control: { type: "text" },
    //   defaultValue: "100 baht",
    //   description: "The subtitle of the card",
    // },
    // width: {
    //   control: { type: "text" },
    // },
  },
};

export default meta;

type Story = StoryObj<CardExpandableComponentArgs>;

export const Default: Story = {
  args: {
    
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1881-53250&p=f&t=XTJhz0YZzlN5r0rX-0",
    },
  },
};