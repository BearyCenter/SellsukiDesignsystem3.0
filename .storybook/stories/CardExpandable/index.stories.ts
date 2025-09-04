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
     <div style="display: flex; flex-direction: column; gap: 20px; flex-wrap: wrap;">
        <h2>Card Expandable</h2>

        <!-- Expand จาก Header: แสดงเฉพาะไอคอน -->
          <ssk-expandable-card
            width="996px"
            variant="outlined"
            type="expand-header"
            title="เงิน"
            subtitle="ราคา 28,900"
          >
            <div slot="header" style="width: 100%; height: 100%; display:flex; align-items:center; justify-content:center; border: 1px solid #E5E7EB; border-radius: 4px; ">
              <ssk-image src="https://img.advice.co.th/images_nas/pic_product4/A0164288/A0164288OK_BIG_1.jpg" objectfit="cover" width="100%" height="100%"></ssk-image>
            </div>
            <div slot="expand">
              <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 16px;">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <ssk-text>รหัสแคตตาล็อก</ssk-text>
                  <ssk-input>รหัสแคตตาล็อก</ssk-input>
                </div>
                <div>
                  <ssk-text>ราคาแคตตาล็อก <span style="color: red;">*</span></ssk-text>
                  <ssk-input type="number" value="1"></ssk-input>
                </div>
                <div>
                  <div style="display: flex; align-items: center;">
                  <ssk-text>เปิดตัวเลือก</ssk-text>
                  <ssk-icon name="outline-information-circle" size="xs" color="gray.500"></ssk-icon>
                  </div>
                  <ssk-toggle size="xl"></ssk-toggle>
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 16px; background-color: #F9FAFB;">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <ssk-text>รหัสแคตตาล็อก</ssk-text>
                  <ssk-input>รหัสแคตตาล็อก</ssk-input>
                </div>
                <div>
                  <ssk-text>ราคาแคตตาล็อก <span style="color: red;">*</span></ssk-text>
                  <ssk-input type="number" value="1"></ssk-input>
                </div>
                <div>
                  <div style="display: flex; align-items: center;">
                  <ssk-text>เปิดตัวเลือก</ssk-text>
                  <ssk-icon name="outline-information-circle" size="xs" color="gray.500"></ssk-icon>
                  </div>
                  <ssk-toggle size="xl"></ssk-toggle>
                </div>
              </div>
            </div>
          </ssk-expandable-card>

          <ssk-expandable-card
            variant="elevated"
            type="expand-header"
            title="Test 1"
            subtitle="Meta"
          >
            <div slot="header" style="width: 100%; height: 100%; display:flex; align-items:center; justify-content:center; background:#eef; ">
              <ssk-icon name="solid-cube"></ssk-icon>
            </div>
            <div slot="expand">
              <ssk-icon name="solid-cube" style="font-size: 32px; color: #3b82f6;"></ssk-icon>
              <ssk-text>รายละเอียดเพิ่มเติม…</ssk-text>
            </div>
          </ssk-expandable-card>

          <ssk-expandable-card
            variant="outlined"
            type="expand-footer"
          >
            <div slot="preview" style="width: 100%; height: 100%; display:flex; align-items:center; justify-content:start; background:#eef; gap: 12px;">
            <div style="width: 40px; height: 40px; display:flex; align-items:center; justify-content:center; background:#eef; ">
              <ssk-icon name="solid-cube"></ssk-icon>
            </div>
              <ssk-text> test 1</ssk-text>
              <ssk-text> test 2</ssk-text>
            </div>
            <div slot="expand">
              <ssk-icon name="solid-cube" style="font-size: 32px; color: #3b82f6;"></ssk-icon>
              <ssk-text>รายละเอียดเพิ่มเติม…</ssk-text>
            </div>
          </ssk-expandable-card>

          <ssk-expandable-card
            variant="elevated"
            type="expand-footer"
            title="Test 1"
            subtitle="Meta"
          >
            <div slot="preview" style="width: 100%; height: 100%; display:flex; align-items:center; justify-content:start; background:#eef; gap: 12px;">
              <div style="width: 40px; height: 40px; display:flex; align-items:center; justify-content:center; background:#eef; ">
                <ssk-icon name="solid-cube"></ssk-icon>
              </div>
              <ssk-text> test 1</ssk-text>
              <ssk-text> test 2</ssk-text>
            </div>
            <div slot="expand">
              <ssk-icon name="solid-cube" style="font-size: 32px; color: #3b82f6;"></ssk-icon>
              <ssk-text>รายละเอียดเพิ่มเติม…</ssk-text>
            </div>
          </ssk-expandable-card>

          <!-- Loading State -->

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
            title="Test 1"
            subtitle="Meta"
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
            title="Test 1"
            subtitle="Meta"
            
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
            variant="outlined"
            type="expand-footer"
            loading
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
            type="expand-footer"
            loading
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
            variant="outlined"
            type="expand-footer"
          >
            <div slot="preview" style="width: 100%; height: 100%; display:flex; align-items:center; justify-content:start; background:#eef; gap: 12px;">
              <div style="width: 40px; height: 40px; display:flex; align-items:center; justify-content:center; background:#eef; ">
                <ssk-icon name="solid-cube"></ssk-icon>
              </div>
              <ssk-text> test 1</ssk-text>
              <ssk-text> test 2</ssk-text>
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
            <div slot="preview" style="width: 100%; height: 100%; display:flex; align-items:center; justify-content:start; background:#eef; gap: 12px;">
              <div style="width: 40px; height: 40px; display:flex; align-items:center; justify-content:center; background:#eef; ">
                <ssk-icon name="solid-cube"></ssk-icon>
              </div>
              <ssk-text> test 1</ssk-text>
              <ssk-text> test 2</ssk-text>
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