import * as ejs from "ejs";
import fs from "fs";
import * as glob from "glob";
import { countryToISO } from "./country-map.js";

const icons = glob.sync("./scripts/generate-icons/icons/country/*.svg");

const iconList = icons
  .map((icon) => {
    let countryName = icon.match(/\/([^/]+)\.svg$/)[1];

    const isoCode = countryToISO[countryName] || null;

    const content = fs.readFileSync(icon, "utf8");

    return { name: isoCode, content };
  })
  .filter((icon) => icon.name !== null);

const template = fs.readFileSync(
  "./scripts/generate-icons/index-country.ts.ejs",
  "utf8",
);

const ts = ejs.render(template, { icons: iconList }, {});

fs.writeFileSync("./src/elements/icon/country-icon.ts", ts);

const indexPath = "./src/elements/icon/index.ts";
if (!fs.existsSync(indexPath)) {
  const indexTsContent = `export * from "./country-icon";`;
  fs.writeFileSync(indexPath, indexTsContent);
} else {
  let indexTsContent = fs.readFileSync(indexPath, "utf8");

  if (!indexTsContent.includes('export * from "./country-icon";')) {
    indexTsContent += '\nexport * from "./country-icon";';
    fs.writeFileSync(indexPath, indexTsContent);
  }
}
