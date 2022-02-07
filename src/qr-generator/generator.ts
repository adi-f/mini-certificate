import * as QRCode from 'qrcode-svg';

// doc: see https://github.com/papnkukn/qrcode-svg
export class Generator {
  constructor(private canvas: HTMLCanvasElement) {}

  generateSvg(data: string): string {
    return new QRCode({
      content: data,
      padding: 0,
      height: 1,
      width: 1,
      ecl: 'L',
      container: 'svg-viewbox'
    }).svg();
  }
}
