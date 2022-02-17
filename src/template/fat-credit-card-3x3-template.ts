import {Template, TemplateInfo} from "./template";
import {Generator} from "../qr-generator/generator";
import {CertificateInfo} from "../certificate/certificate-info";

export class FatCreditCard3x3Template extends Template {
  render(): HTMLElement {
    const html = `<div style="display: inline-block; width: 20cm; height: 29cm"></div>`;
    const page: HTMLElement = this.toHtml(html);
    for(let certificate of this.getCertificates(9)) {
      page.appendChild(this.createCard(certificate))
    }
    return page
  }

  private createCard(certificateInfo: CertificateInfo): HTMLElement {
    const name = this.formatName(certificateInfo.firstName, certificateInfo.lastName);
    const dateOfVaccination = this.formatDate(certificateInfo.dateOfVaccination);
    const product = certificateInfo.product;
    const svgQrCode = new Generator(null).generateSvg(certificateInfo.qrCode);

    const html =
`<div style="display: inline-block; text-align: center; width: 57mm; height: 80mm; padding: 0; border: 1px solid darkgray; margin: 8mm 4mm; vertical-align: top">
  ${svgQrCode}
  <div style="display: block; text-align: left; font-family: sans-serif; font-size: 0.4cm; margin: 0 1mm">
    <div style="display: inline-block; font-weight: bold">Name: </div>
    <div style="display: inline-block; padding-left: 0.6em">${name}</div>
    <br>
    <div style="display: inline-block; font-weight: bold">Date of Vacc.: </div>
    <div style="display: inline-block; padding-left: 0.6em">${dateOfVaccination}</div>
    <br>
    <div style="display: inline-block; font-weight: bold">Vaccine: </div>
    <div style="display: inline-block; padding-left: 0.6em">${product}</div>
  </div>
</div>`

    const element: HTMLElement = this.toHtml(html);
    const svg: SVGElement= element.querySelector('svg');
    svg.setAttribute('style', 'display: inline-block; width: 55mm; height: 55mm; margin: 3mm auto');

    return element;
  }

  getInfo(): TemplateInfo {
    return {
      id: this.constructor.name,
      name: '3 x 3 fat credit cards'
    };
  }
}
