import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/code-block";
import { CodeBlock } from "../../../src/elements/code-block";

type CodeBlockWithLabel = Omit<CodeBlock, "codeblock">;

const meta = {
  title: "Example/CodeBlock",
  tags: [],
  render: ({ ...args }) => {
    return html` <style></style>

    <div class="background">
      <ssk-code-block ${spread(args)}></ssk-code-block>
    </div>`;
  },
} satisfies Meta<CodeBlockWithLabel>;

export default meta;

type Story = StoryObj<CodeBlockWithLabel>;

export const ShowCase: Story = {
  args: {
    language:"json",
    code: `{
      "activity_type": {
        "id": "41cd2194-7554-462c-be2c-6144f68ecaf8",
        "name": "oc2plus"
      },
      "created_at": "2022-11-24T04:16:26Z",
      "error": "",
      "status": {
        "added": 50,
        "duplicated": 10
      },
      "token": "3ks5t9sLpSobq4ieKBA68pu49I8C7G1UQJ95WZyrLvfIGKuHz5h54yCGm1yPXeH7dazdkjGUDRsl5CCr2qxfP1btEk94HGkElput2q5StrQif3hvQHpRlJWIpj"
    }`,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=8686-18641&mode=design&t=fAcmps2yqcb8lIW1-0",
    },
  },
};
