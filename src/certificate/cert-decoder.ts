import {decode as decodeBase45} from 'base45-web';
import {deflate} from 'pako';
// @ts-ignore
import * as COBR from 'cbor-js';


// docs certificate:
// - Certificate https://ec.europa.eu/health/system/files/2021-04/digital-green-certificates_v3_en_0.pdf
// - zlib https://en.wikipedia.org/wiki/Zlib
// - COBR: https://en.wikipedia.org/wiki/CBOR

// docs libs:
// - https://github.com/irony/base45
// - https://github.com/nodeca/pako (zlib)
// - https://www.npmjs.com/package/cbor-js

const HEALT_CERTIFICATE_V1 = 'HC1'

export function decode(data: string): void {
  const base45: string = checkVersionAndGetBase45(data);
  const zlib: ArrayBuffer = decodeBase45(base45);
  const cobr: Uint8Array = deflate(new Uint8Array(zlib));
  const obj = COBR.decode(cobr.buffer);
  console.log(obj);
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
