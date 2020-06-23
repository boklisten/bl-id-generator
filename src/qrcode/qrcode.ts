import { Canvas, PNGStream } from "canvas";
import * as QRCode from "qrcode";

class QrCode {
  constructor() {}

  public createCanvas(id: string): Canvas {
    const canvas = new Canvas(400, 400);

    QRCode.toCanvas(canvas, id, { margin: 2, scale: 16 }, error => {
      if (error) {
        console.log("there was an error", error);
        return;
      }
    });

    return canvas;
  }

  public createPNGStream(id: string): PNGStream {
    return this.createCanvas(id).createPNGStream();
  }
}

export const qrCode = new QrCode();
