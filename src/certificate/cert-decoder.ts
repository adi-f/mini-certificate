import {decode as decodeBase45} from 'base45-web';
import {inflate} from 'pako';
// @ts-ignore
import {decode as decodeCbor} from 'cbor-js';


// docs certificate:
// - Certificate https://ec.europa.eu/health/system/files/2021-04/digital-green-certificates_v3_en_0.pdf
// - zlib https://en.wikipedia.org/wiki/Zlib
// - COBR: https://en.wikipedia.org/wiki/CBOR

// docs libs:
// - https://github.com/irony/base45
// - https://github.com/nodeca/pako (zlib)
// - https://www.npmjs.com/package/cbor-js

const HEALT_CERTIFICATE_V1 = 'HC1';
const COSE_PAYLOAD_POS = 2;
const HCERT_KEY = -260;
const FIRST_HCERT_KEY = 1;

export function decode(data: string): void {
  const base45: string = checkVersionAndGetBase45(data);
  const zlib: ArrayBuffer = decodeBase45(base45);
  const coseBinary: Uint8Array = inflate(new Uint8Array(zlib));
  const coseObj = decodeCbor(toArrayBuffer(coseBinary));
  const payloadBinary: Uint8Array = coseObj[COSE_PAYLOAD_POS];
  const payloadObj = decodeCbor(toArrayBuffer(payloadBinary));
  const hcert = payloadObj[HCERT_KEY][FIRST_HCERT_KEY];
  console.log(hcert);
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
