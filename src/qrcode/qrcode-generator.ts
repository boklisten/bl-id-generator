import { Canvas, PNGStream } from "canvas";
import * as QRCode from "qrcode";

class QRCodeGenerator {
  public canvas(id: string): Canvas {
    this.validateId(id);

    const canvas = new Canvas(250, 250);

    return this.fillCanvasWithQRCode(canvas, id);
  }

  public pngStream(id: string): PNGStream {
    return this.canvas(id).createPNGStream();
  }

  private fillCanvasWithQRCode(canvas: Canvas, id: string): Canvas {
    QRCode.toCanvas(
      canvas,
      id,
      { margin: 2, scale: 10, errorCorrectionLevel: "H" },
      error => {
        if (error) {
          throw error;
        }
      }
    );
    return canvas;
  }

  private validateId(id: string) {
    if (!id || id.length <= 0) {
      throw new TypeError(
        "id is empty or undefined when trying to create qrcode"
      );
    }
  }
}

export const qrCodeGenerator = new QRCodeGenerator();
