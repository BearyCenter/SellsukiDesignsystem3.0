import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/image-cropper"; // make sure component is registered
import { ImageCropper } from "../../../src/components/image-cropper";

const meta: Meta<ImageCropper> = {
  title: "Components/Media & Branding/ImageCropper",
  component: "ssk-image-cropper",
  tags: ["autodocs"],
  render: (args) => {
    const resultId = `result-image-cropper`;
    const componentId = `ssk-image-cropper`;
    const btnId = `btn-image-cropper`;

    setTimeout(() => {
      const cropBtn = document.getElementById(btnId);
      cropBtn?.addEventListener("click", async () => {
        const cropper = document.getElementById(componentId) as ImageCropper;
        const result = await cropper.crop("png");
        const resultImg = document.getElementById(resultId) as HTMLImageElement;
        if (result) resultImg.src = result;
      });
    }, 0);

    return html`
      <ssk-image-cropper
        id="${componentId}"
        .src=${args.src}
        .maskSize=${args.maskSize}
        .maskPadding=${args.maskPadding}
        .maxExportSize=${args.maxExportSize}
        .fitToMask=${args.fitToMask}
      ></ssk-image-cropper>
      <button id="${btnId}" style="margin-top: 1rem">Crop Image</button>
      <h4>Result:</h4>
      <img id="${resultId}" />
    `;
  },
  argTypes: {
    src: { control: "text", description: "Source image URL" },
    maskSize: {
      control: "number",
      description: "Fixed size (px) of the crop area",
    },
    maskPadding: {
      control: "number",
      description: "Padding around crop area",
    },
    maxExportSize: {
      control: "number",
      description: "Maximum export size in pixels",
    },
    fitToMask: { control: "boolean", description: "Fit image to mask" },
  },
};

export default meta;

type Story = StoryObj<ImageCropper>;

export const Default: Story = {
  args: {
    src: "/public/TheShibas.png",
    maskSize: 200,
    maskPadding: 20,
    maxExportSize: 500,
    fitToMask: false,
  },
};
