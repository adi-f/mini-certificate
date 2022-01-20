import QrScanner from 'qr-scanner';
// @ts-ignore
import QrScannerWorkerPath
  from '!!file-loader!../../node_modules/qr-scanner/qr-scanner-worker.min.js';

// doc: see https://github.com/nimiq/qr-scanner

QrScanner.WORKER_PATH = QrScannerWorkerPath;

export class Scanner {
  private qrScanner: QrScanner;
  private currentResolve: (qrCode: string) => void;


  constructor(video: HTMLVideoElement) {
    this.qrScanner = new QrScanner(
        video,
        result => this.internalQrCallback(result),
        error => this.onScanError(error),
        vid => this.config(vid));
  }

  readCode(): Promise<string> {
    const promise = new Promise<string>(resolve => this.currentResolve = resolve);
    this.qrScanner.start();
    return promise;
  }

  private internalQrCallback(data: string): void {
    this.qrScanner.stop();
    this.currentResolve(data)
  }

  private config(video: HTMLVideoElement): QrScanner.ScanRegion {
    // try to optimize for large QR codes
    const maxSquare = Math.min(video.videoWidth, video.videoHeight);
    let scaleTo;
    for(scaleTo = maxSquare; scaleTo >= 1600; scaleTo = Math.round(scaleTo/2)) {} // min scale: >= 800px
    console.log(`scan size: ${maxSquare}px; scaled to: ${scaleTo}px`)
    return {
      x: Math.round((video.videoWidth - maxSquare) / 2),
      y: Math.round((video.videoHeight - maxSquare) / 2),
      width: maxSquare,
      height: maxSquare,
      downScaledWidth: scaleTo, // QrScanner.DEFAULT_CANVAS_SIZE,
      downScaledHeight: scaleTo, // QrScanner.DEFAULT_CANVAS_SIZE
    };
  }

  private onScanError(error: string): void {
    if (error !== QrScanner.NO_QR_CODE_FOUND) {
      console.warn(error)
    }
  }
}
