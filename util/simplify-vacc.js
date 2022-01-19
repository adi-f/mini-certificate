const fs = require('fs');

/**
 * (Re)creates the src/certificate/vaccine-products.ts from the vaccine-medicinal-product.json
 * Sources of the vaccine-medicinal-product.json
 * - https://github.com/ehn-dcc-development/ehn-dcc-valuesets/blob/main/vaccine-medicinal-product.json
 * - https://github.com/admin-ch/CovidCertificate-Examples/blob/main/valuesets/vaccine-medicinal-product.json
 */

const products = require('./vaccine-medicinal-product.json');

const productsSimple = Object.fromEntries(Object.entries(products.valueSetValues).map(([code, properties]) => [code, properties.display]));
const productsSimpleJson = JSON.stringify(productsSimple, null, 2);

console.log(productsSimpleJson);
const jsFile =
`// generated file, see simplify-vacc.js
export const vaccineProducts: {[code: string]: string} = ${productsSimpleJson};
`;

fs.writeFileSync('src/certificate/vaccine-products.ts', jsFile);
