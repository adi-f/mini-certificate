import {Scanner} from "./qr-scanner/scanner";
import {Generator} from "./qr-generator/generator";

const scanner = new Scanner(document.querySelector('video'));
const generator = new Generator(document.querySelector('canvas'));

scanner.readCode().then((data: string) => generator.generate(data));
