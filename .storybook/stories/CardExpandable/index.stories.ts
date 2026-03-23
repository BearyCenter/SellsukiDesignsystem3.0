import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/card-expandable";
import { ExpandableCard } from "../../../src/components/card-expandable";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type CardExpandableComponentArgs = AutoLitProperty<ExpandableCard> & { label: string };

const meta: Meta<ExpandableCard> = {
  title: "Components/Data Display/CardExpandable",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`
    <h2>Card Expandable</h2>

      <ssk-expandable-card ${spread({ ...args })}>
        <div slot="expand" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
          <ssk-text size="md" fontWeight="medium">Content</ssk-text>
        </div>
      </ssk-expandable-card>
    `;
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["outlined", "elevated"],
      table: {
        defaultValue: { summary: "card" },
      },
      description: "The variant style of the expandable card",
    },
    type: {
      control: { type: "select" },
      options: ["expand-header", "expand-footer"],
      table: {
        defaultValue: { summary: "expand-header" },
      },
      description: "The type of the expandable card",
    },
    title: {
      control: { type: "text" },
      defaultValue: "Product name Product name Product name",
      description: "The title of the expandable card",
    },
    subtitle: {
      control: { type: "text" },
      defaultValue: "100 baht",
      description: "The subtitle of the expandablecard",
    },
    width: {
      control: { type: "text" },
      defaultValue: "366px",
      description: "The width of the expandable card",
    },
    height: {
      control: { type: "text" },
      defaultValue: "auto",
      description: "The height of the expandable card",
    },
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

export const CardExpandWithTable: Story = {
  args: {
    width: "100%",
    title: "เงิน",
    subtitle: "ราคา 28,900",
  },
  parameters: {
    design: {
      type: "figma",
      url: "",
    },
  },
  render: ({ ...args }) => {
    return html`
      <style>
        .catalog-information {
          padding: 16px;
          display: grid;
          grid-template-columns: 6fr 2fr 1fr;
          gap: 16px;
          border-bottom: 1px solid #E5E7EB;
        }

        .toggle, .toggle-container{
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .toggle-container{
          height: 366px;
          justify-content:center;
        }

        .product-info-container{
          display:flex;
          align-items: center;
          gap: 16px;
        }

        .input-amount{
          display: grid;
          grid-template-areas: "prefix input postfix";
          grid-template-columns: auto 1fr auto;
          align-items: center;
          border-style: solid;
          transition: background-color 0.2s ease-in-out;

          border-radius: 7px;
          border: 1px solid #bfbfbf;

          gap: 0.75rem;
          padding: 0.25rem;
          padding-left: 0.75rem;
          background: white;
          width: 366px;
          text-overflow: ellipsis;

          font-size: 24px;
          font-weight: 400;
          font-family: DB HeaventRounded;
        }
      </style>

      <div>
        <h2>Card Expandable with Table Example case that's use in Product Catalog</h2>
        <ssk-expandable-card ${spread(args)}>

          <div slot="header">
            <ssk-image
              src="https://img.advice.co.th/images_nas/pic_product4/A0164288/A0164288OK_BIG_1.jpg"
              objectfit="cover"
              width="366px"
              height="366px"
            />
          </div>
          <div slot="expand">
            <div class="expand-container">
              <section class="catalog-information">
                <div class="csku">
                  <ssk-text>รหัสแคตตาล็อก</ssk-text>
                  <ssk-input
                    size="md"
                    placeholder="กรุณากรอก รหัสแคตตาล็อก"
                  />
                </div>
                <div class="price">
                  <ssk-text>
                      ราคาแคตตาล็อก
                      <span style="color: red">*</span>
                  </ssk-text>
                  <ssk-input
                    size="md"
                    placeholder="กรุณากรอก ราคาแคตตาล็อก"
                  >
                  <ssk-input-addon slot="prefix">
                    <ssk-text style="padding: 0 1rem; border-right: 1px solid #E5E7EB" >฿</ssk-text>
                  </ssk-input-addon>
                </div>
                <div class="toggle">
                  <ssk-text>เปิดตัวเลือก</ssk-text>
                  <div class="toggle-container">
                    <ssk-toggle checked=true>
                  </div>
                </div>
              </section>

              <section class="product-table">
                <ssk-dynamic-table
                  backgroundColor="#F9FAFB"
                  stripedBackgroundColor="#F9FAFB"
                  .columnsWidth=${[
                    "minmax(200px, 1fr)",
                    "161px",
                    "95px",
                    "68px",
                  ]}
                  height="auto"
                >
                  <ssk-header-cell slot="headers" align="left">
                    <ssk-text size="sm" color="gray.500" fontWeight="medium">ชื่อสินค้า</ssk-text>
                  </ssk-header-cell>
                  <ssk-header-cell slot="headers" align="left">
                    <ssk-text size="sm" color="gray.500" fontWeight="medium">ราคา</ssk-text>
                  </ssk-header-cell>
                  <ssk-header-cell slot="headers" align="left">
                    <div style="display:flex; gap: 4px;">
                      <ssk-text size="sm" color="gray.500" fontWeight="medium">จำนวน</ssk-text>
                      <ssk-text size="sm" color="red.500" fontWeight="medium">*</ssk-text>
                    </div>
                  </ssk-header-cell>
                  <ssk-header-cell slot="headers">
                  </ssk-header-cell>

                  <ssk-table-cell align="left">
                    <div class="product-info-container">
                      <figure style="width: 48px; height:48px; border-radius: 4px; border: 1px solid #e5e7eb; margin: 0;">
                        <ssk-image
                          src="https://img.advice.co.th/images_nas/pic_product4/A0164288/A0164288OK_BIG_1.jpg"
                          objectfit="cover"
                          width="366px"
                          height="366px"
                        />
                      </figure>
                      <section class="product-info">
                        <ssk-text fontWeight="medium">Imac 2025</ssk-text>
                        <ssk-text size="xs" fontWeight="medium">Grey</ssk-text>
                        <ssk-text size="xs" color="gray.500">IMAC-Grey25</ssk-text>
                      </section>
                    </div>
                  </ssk-table-cell >
                  <ssk-table-cell align="left">
                    <div class="product-price-container">
                      <ssk-text size="sm">
                        <span style="color: #6B7280;">฿ </span>
                        28,900
                      </ssk-text>
                    </div>
                  </ssk-table-cell>
                  <ssk-table-cell align="left">
                    <div class="product-amount-container">
                      <input class="input-amount"
                        placeholder="กรุณากรอก จำนวน"
                      />
                    </div>
                  </ssk-table-cell>
                  <ssk-table-cell align="left">
                    <div class="product-btn-container">
                      <ssk-icon name="solid-x-circle"></ssk-icon>
                    </div>
                  </ssk-table-cell>

                  <ssk-table-cell align="left">
                    <div class="product-info-container">
                      <figure style="width: 48px; height:48px; border-radius: 4px; border: 1px solid #e5e7eb; margin: 0;">
                        <ssk-image
                          src="https://img.advice.co.th/images_nas/pic_product4/A0164288/A0164288OK_BIG_1.jpg"
                          objectfit="cover"
                          width="366px"
                          height="366px"
                        />
                      </figure>
                      <section class="product-info">
                        <ssk-text fontWeight="medium">Imac 2025</ssk-text>
                        <ssk-text size="xs" fontWeight="medium">Grey</ssk-text>
                        <ssk-text size="xs" color="gray, 500">IMAC-Grey25</ssk-text>
                      </section>
                    </div>
                  </ssk-table-cell >
                  <ssk-table-cell align="left">
                    <div class="product-price-container">
                      <ssk-text size="sm">
                        <span style="color: #6B7280;">฿ </span>
                        28,900
                      </ssk-text>
                    </div>
                  </ssk-table-cell>
                  <ssk-table-cell align="left">
                    <div class="product-amount-container">
                      <input class="input-amount"
                        placeholder="กรุณากรอก จำนวน"
                      />
                    </div>
                  </ssk-table-cell>
                  <ssk-table-cell align="left">
                    <div class="product-btn-container">
                      <ssk-icon name="solid-x-circle"></ssk-icon>
                    </div>
                  </ssk-table-cell>

                  <ssk-table-row expanded >
                    <div style="display:flex; justify-content:center;">
                      <ssk-button variant="outline" themeColor="primary">
                        <ssk-icon slot="prefix" name="solid-plus" size=""></ssk-icon>
                        เลือกสินค้าเข้าแคตตาล็อก
                      </ssk-button>
                    </div>
                  </ssk-table-row>
                  
                </ssk-dynamic-table>
              </section>
            </div>
          </div>
        </ssk-expandable-card>
      </div>
    `;
  },
};