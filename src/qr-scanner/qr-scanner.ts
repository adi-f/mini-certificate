import QrScanner from 'qr-scanner';
// @ts-ignore
import QrScannerWorkerPath from '!!file-loader!../../node_modules/qr-scanner/qr-scanner-worker.min.js';

QrScanner.WORKER_PATH = QrScannerWorkerPath;

export class Scanner {
  private qrScanner: QrScanner;
  private currentResolve: (qrCode: string) => void;


  constructor(video: HTMLVideoElement) {
    this.qrScanner = new QrScanner(
        video,
        result => this.internalQrCallback(result));
  }

  readCode(): Promise<string> {
    const promise = new Promise<string>(resolve => this.currentResolve = resolve);
    this.qrScanner.start();
    return promise;
  }

  private internalQrCallback(result: string): void {
    this.qrScanner.stop();
    this.currentResolve(result)
  }
}