import fs from "fs";
import * as glob from "glob";

const generateCountryMap = () => {
  const icons = glob.sync(
    "./scripts/generate-country-icons/icons/Country=*.svg",
  );

  let existingCountryToISO = {};
  if (fs.existsSync("./scripts/generate-country-icons/country-map.js")) {
    const existingFileContent = fs.readFileSync(
      "./scripts/generate-country-icons/country-map.js",
      "utf-8",
    );
    const match = existingFileContent.match(
      /export const countryToISO = (\{.*?\});/s,
    );
    if (match) {
      existingCountryToISO = eval(`(${match[1]})`);
    }
  }

  let countryToISO = { ...existingCountryToISO };

  icons.forEach((icon) => {
    let countryName = icon.match(/Country=([^.]+)\.svg$/)[1];

    countryName = countryName
      .replace(/\s+/g, "_")
      .replace(/\band\b/g, "_and_")
      .replace(/-/g, "_")
      .trim();

    if (!countryToISO[countryName]) {
      countryToISO[countryName] = "";
    }
  });

  const sortedCountryToISO = Object.keys(countryToISO)
    .sort()
    .reduce((acc, key) => {
      acc[key] = countryToISO[key];
      return acc;
    }, {});

  const fileContent = `export const countryToISO = ${generateObjectString(
    sortedCountryToISO,
  )};`;

  fs.writeFileSync(
    "./scripts/generate-country-icons/country-map.js",
    fileContent,
  );
};

const generateObjectString = (obj) => {
  return `{
    ${Object.entries(obj)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join(",\n    ")}
  }`;
};

generateCountryMap();
