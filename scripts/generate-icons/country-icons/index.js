import * as ejs from "ejs";
import fs from "fs";
import * as glob from "glob";
import iso from "iso-3166-1";

const specialCountryMap = new Map([
  ["Congo", "COG"],
  ["DR Congo", "COD"],
  ["Curacao", "CUW"],
]);

function getCountryISOCode(countryName) {
  if (specialCountryMap.has(countryName)) {
    return specialCountryMap.get(countryName) || null;
  }

  const countryData = iso.whereCountry(countryName);
  return countryData ? countryData.alpha3 : null;
}

export function generateCountryIcons() {
  const icons = glob.sync("./scripts/generate-icons/icons/country/*.svg");

  const iconList = icons
    .map((icon) => {
      let countryName = icon.match(/\/([^/]+)\.svg$/)[1];

      const isoCode = getCountryISOCode(countryName);

      if (!isoCode) {
        console.warn(`⚠️  ไม่พบรหัส ISO-3 สำหรับประเทศ: ${countryName}`);
      }
      const content = fs.readFileSync(icon, "utf8");

      return { name: isoCode, content };
    })
    .filter((icon) => icon.name !== null);

  const template = fs.readFileSync(
    "./scripts/generate-icons/country-icons/index.ts.ejs",
    "utf8",
  );

  const ts = ejs.render(template, { icons: iconList }, {});

  // write the generated code to "./src/elements/icon/country-icon.ts"
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
}
