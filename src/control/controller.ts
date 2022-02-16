import {Scanner} from "../qr-scanner/scanner";
import {decode} from "../certificate/cert-decoder";
import {Template} from "../template/template";
import {FatCreditCard3x3Template} from "../template/fat-credit-card-3x3-template";
import {CertificateInfo} from "../certificate/certificate-info";

export class Controller {
  private scanButton: HTMLButtonElement;
  private templateSelect: HTMLSelectElement;
  private printButton: HTMLButtonElement;
  private certificateList: HTMLUListElement;

  private scanner: Scanner;
  private templates: Map<string, Template> = new Map<string, Template>();

  private certificates: CertificateInfo[] = [];
  private currentTemplate: Template | null = null;

  constructor(private document: Document) {
    this.init();
    this.initTemplates();
  }

  private init(): void {
    this.scanButton = this.document.getElementById('scan-btn') as HTMLButtonElement;
    this.templateSelect = this.document.getElementById('template-select') as HTMLSelectElement;
    this.printButton = this.document.getElementById('print-btn') as HTMLButtonElement;
    this.certificateList = this.document.getElementById('cert-list') as HTMLUListElement;

    this.scanner = new Scanner(this.document.querySelector('video'));

    this.scanButton.addEventListener('click', () => this.scan())
    this.templateSelect.addEventListener('change', () => this.switchTemplate())
    this.printButton.addEventListener('click', () => this.print())
  }

  private initTemplates() {
    [
      new FatCreditCard3x3Template()
    ].forEach(template => {
      const info = template.getInfo();
      this.templates.set(info.id, template);
      const option: HTMLOptionElement = this.document.createElement('option');

      option.value = info.id;
      option.innerText = info.name;
      this.templateSelect.appendChild(option);
    })
  }

  // private hide(element: HTMLElement): void {
  //   element.style.display = 'hidden';
  // }
  //
  // private show(element: HTMLElement): void {
  //   element.style.display = 'inherit';
  // }

  private print(): void {
    document.defaultView.print();
  }

  private scan(): void {
    this.scanner.readCode().then((data: string) => {
      console.log("Code:", data)
      const certificate = decode(data);
      console.log("Certificate:", certificate);
      this.certificates.push(certificate);
      this.addCertificateToList(certificate)

      if(this.currentTemplate) {
        this.render();
      }
    });
  }

  private addCertificateToList(certificate: CertificateInfo) {
    const li: HTMLLIElement = this.document.createElement('li');
    li.innerText = certificate.firstName + ' ' + certificate.lastName;
    this.certificateList.appendChild(li);
  }

  private switchTemplate() {
    const templateId = this.templateSelect.value;
    if(templateId) {
      this.currentTemplate = this.templates.get(templateId);
      if(this.certificates.length > 0) {
        this.render();
      }
    } else {
      this.currentTemplate = null;
    }
  }

  private render(): void {
    this.currentTemplate.setDocument(this.document);
    this.currentTemplate.setCertificates(this.certificates);

    const output: HTMLElement = this.currentTemplate.render();
    const printSection: HTMLElement = document.getElementById('print-section');
    printSection.firstChild?.remove();
    printSection.appendChild(output);
  }
}
