import {Scanner} from "./qr-scanner/scanner";
import {Generator} from "./qr-generator/generator";
import {decode} from "./certificate/cert-decoder";

const scanner = new Scanner(document.querySelector('video'));
const generator = new Generator(document.querySelector('canvas'));

scanner.readCode().then((data: string) => {
  console.log("Code:", data)
  generator.generate(data)
  const certificate = decode(data);
  console.log("Certificate:", certificate)
});

