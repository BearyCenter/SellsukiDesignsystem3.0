import * as ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fontsMap = [
  {
    src: "fonts/DB HeaventRounded v3.2.1.ttf",
    format: "truetype",
    name: "DB HeaventRounded",
    style: "normal",
    weight: 400,
  },
  {
    src: "fonts/DB HeaventRounded It v3.2.1.ttf",
    format: "truetype",
    name: "DB HeaventRounded",
    style: "italic",
    weight: 400,
  },
  {
    src: "fonts/DB HeaventRounded Med v3.2.1.ttf",
    format: "truetype",
    name: "DB HeaventRounded",
    style: "normal",
    weight: 500,
  },
  {
    src: "fonts/DB HeaventRounded Med It v3.2.1.ttf",
    format: "truetype",
    name: "DB HeaventRounded",
    style: "italic",
    weight: 500,
  },
  {
    src: "fonts/DB HeaventRounded Bd v3.2.1.ttf",
    format: "truetype",
    name: "DB HeaventRounded",
    style: "normal",
    weight: 700,
  },
  {
    src: "fonts/DB HeaventRounded Bd It v3.2.1.ttf",
    format: "truetype",
    name: "DB HeaventRounded",
    style: "italic",
    weight: 700,
  },
  {
    src: "fonts/DB HeaventRounded Blk v3.2.1.ttf",
    format: "truetype",
    name: "DB HeaventRounded",
    style: "normal",
    weight: 900,
  },
  {
    src: "fonts/DB HeaventRounded Blk It v3.2.1.ttf",
    format: "truetype",
    name: "DB HeaventRounded",
    style: "italic",
    weight: 900,
  },
];

// read all fonts and generate base64 data of font to field `base64`
fontsMap.forEach((font, i) => {
  const fontPath = path.resolve(__dirname, font.src);
  const fontData = fs.readFileSync(fontPath);
  fontsMap[i].base64 = fontData.toString("base64");
});

// render template
const template = fs.readFileSync(
  "./scripts/generate-fonts/fonts.css.ejs",
  "utf8",
);

const ts = ejs.render(
  template,
  {
    fonts: fontsMap,
  },
  {},
);

// write the generated code to "./src/assets/fonts.css"
fs.writeFileSync("./src/assets/fonts.css", ts);
