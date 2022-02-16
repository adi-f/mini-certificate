import './style.css';
import {Controller} from "./control/controller";

new Controller(document);


import {Scanner} from "./qr-scanner/scanner";
// import {Generator} from "./qr-generator/generator";
import {decode} from "./certificate/cert-decoder";
import {Template} from "./template/template";
import {FatCreditCard3x3Template} from "./template/fat-credit-card-3x3-template";

// const scanner = new Scanner(document.querySelector('video'));
// const generator = new Generator(document.querySelector('canvas'));

// scanner.readCode().then((data: string) => {
//   console.log("Code:", data)
//   // generator.generate(data)
//   const certificate = decode(data);
//   console.log("Certificate:", certificate);
//
//   const tempalate: Template = new FatCreditCard3x3Template();
//   tempalate.setDocument(document);
//   tempalate.setCertificates([certificate]);
//   const output = tempalate.render();
//   document.getElementById('print-section').appendChild(output)
// });

// Test
// const tempalate: Template = new FatCreditCard3x3Template();
// tempalate.setDocument(document);
// tempalate.setCertificates([
//   {
//     qrCode: 'ABCDEFG12345TEST',
//     firstName: 'John Adam',
//     lastName: 'Doe',
//     dob: '1976-12-23',
//     product: 'EU/1/20/1528',
//     dateOfVaccination: '2021-12-16'
//   },{
//     qrCode: '1234567890abcdefgh',
//     firstName: 'Johny',
//     lastName: 'English',
//     dob: '1976-12-23',
//     product: 'EU/1/20/1528',
//     dateOfVaccination: '2021-12-16'
//   }
// ]);
// const output = tempalate.render();
// document.getElementById('print-section').appendChild(output)
