import {decode as decodeBase45} from 'base45-web';
import {inflate} from 'pako';
// @ts-ignore
import {decode as decodeCbor} from 'cbor-js';
import {Hcert} from "./hcert";
import {CertificateInfo} from "./certificate-info";
import {vaccineProducts} from './vaccine-products'


// docs certificate:
// - certificate https://ec.europa.eu/health/system/files/2021-04/digital-green-certificates_v3_en_0.pdf
// - JSON structure https://ec.europa.eu/health/system/files/2021-06/covid-certificate_json_specification_en_0.pdf

// docs libs:
// - https://github.com/irony/base45
// - https://github.com/nodeca/pako (zlib)
// - https://www.npmjs.com/package/cbor-js

const HEALT_CERTIFICATE_V1 = 'HC1';
const COSE_PAYLOAD_POS = 2;
const HCERT_KEY = -260;
const FIRST_HCERT_KEY = 1;

export function decode(data: string): CertificateInfo {
  const base45: string = checkVersionAndGetBase45(data);
  const zlib: ArrayBuffer = decodeBase45(base45);
  const coseBinary: Uint8Array = inflate(new Uint8Array(zlib));
  const coseObj = decodeCbor(toArrayBuffer(coseBinary));
  const payloadBinary: Uint8Array = coseObj[COSE_PAYLOAD_POS];
  const payloadObj = decodeCbor(toArrayBuffer(payloadBinary));
  const hcert: Hcert = payloadObj[HCERT_KEY][FIRST_HCERT_KEY];
  return toCertificateInfo(hcert)
}

function checkVersionAndGetBase45(data: string): string {
  const split = data.indexOf(':')
  const version = data.substring(0, split);
  const base45 = data.substring(split+1);
  if (version !== HEALT_CERTIFICATE_V1) {
    console.warn(`Unknown Version: got '${version}', expected '${HEALT_CERTIFICATE_V1}'`);
  }
  return base45;
}

function toArrayBuffer(uint8: Uint8Array): ArrayBuffer {
  // 'cbor-js' bug? the returned uint8.buffer doesn't match to the Uint8Array data...
  return new Uint8Array(uint8).buffer;
}

function toCertificateInfo(hcert: Hcert): CertificateInfo {
  return {
    firstName: hcert.nam.fn,
    lastName: hcert.nam.gn,
    dob: hcert.dob,
    product: vaccineProductsCodeToName(hcert.v[0].mp),
    dateOfVaccination: hcert.v[0].dt
  };
}

function vaccineProductsCodeToName(code: string): string {
  const name = vaccineProducts[code];
  if(typeof name === 'string') {
    return name;
  } else {
    console.warn('Unknown vaccine: ' + code)
    return code;
  }
}
