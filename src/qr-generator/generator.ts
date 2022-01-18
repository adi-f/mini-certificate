import * as QRCode from 'qrcode';

// doc: see https://github.com/soldair/node-qrcode
export class Generator {
  constructor(private canvas: HTMLCanvasElement) {}

  generate(data: string): void {
    QRCode.toCanvas(this.canvas, data)
    // QRCode.toCanvas(this.canvas, [{data, mode: "numeric"}])
  }
}
