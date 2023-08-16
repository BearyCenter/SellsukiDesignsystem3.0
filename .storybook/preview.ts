import type { Preview } from "@storybook/web-components";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (story: any) => {
      const el = story();
      const wrapper = document.createElement("div");
      wrapper.style.padding = "20px";
      wrapper.style.border = "1px solid #ccc";
      wrapper.appendChild(el);
      return wrapper;
    },
  ],
};

export default preview;
