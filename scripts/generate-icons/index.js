import * as ejs from "ejs";
import fs from "fs";
import * as glob from "glob";

const icons = glob.sync("./scripts/generate-icons/icons/*/*.svg");

// generate a list of icons
// { name: string, variant: string, content: string }[]

const iconList = icons.map((icon) => {
  const name = icon.match(/\/([^/]*)\.svg$/)[1];
  const variant = icon.match(/\/([^/]*)\/[^/]*\.svg$/)[1];
  const content = fs.readFileSync(icon, "utf8");
  return { name, variant, content };
});

// render a template with the list of icons using ejs
const template = fs.readFileSync(
  "./scripts/generate-icons/index.ts.ejs",
  "utf8",
);

const ts = ejs.render(
  template,
  {
    icons: iconList,
    pascal: (str) => {
      // icon-solid-x-mark -> IconSolidXMark
      return `${str}`
        .toLowerCase()
        .replace(new RegExp(/[-_]+/, "g"), " ")
        .replace(new RegExp(/[^\w\s]/, "g"), "")
        .replace(
          new RegExp(/\s+(.)(\w*)/, "g"),
          ($1, $2, $3) => `${$2.toUpperCase() + $3}`,
        )
        .replace(new RegExp(/\w/), (s) => s.toUpperCase());
    },
  },
  {},
);

// write the generated code to "./src/components/icon/index.ts"
fs.writeFileSync("./src/elements/icon/index.ts", ts);
