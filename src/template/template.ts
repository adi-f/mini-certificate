import {CertificateInfo} from "../certificate/certificate-info";

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export abstract class Template {
  protected certificates: CertificateInfo[]
  protected document: Document

  setCertificates(certificates: CertificateInfo[]) {
    this.certificates = certificates;
  }

  setDocument(document: Document) {
    this.document = document;
  }

  abstract render(): HTMLElement;

  protected formatName(firstName: string, lastName: string): string {
    return firstName + ' ' + lastName;
  }

  protected getCertificates(count: number): CertificateInfo[] {
    const result: CertificateInfo[] = [];
    for (let i = 0; i < count; i++) {
      result.push(this.certificates[i % this.certificates.length]);
    }
    return result;
  }

  protected toHtml(html: string): HTMLElement {
    const template: HTMLTemplateElement = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild as HTMLElement;
  }

  protected formatDate(isoDate: string) {
    const year = parseInt(isoDate.substring(0, 4), 10);
    const month = MONTHS[parseInt(isoDate.substring(5, 7), 10) - 1];
    const day = parseInt(isoDate.substring(8, 10), 10);
    return`${day}. ${month} ${year}`
  }
}
