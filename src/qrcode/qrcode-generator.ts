import { Canvas, PNGStream } from "canvas";
import * as QRCode from "qrcode";
import { SETTINGS } from "../settings";

class QRCodeGenerator {
  constructor() {}

  public canvas(id: string): Canvas {
    this.validateId(id);

    const canvas = new Canvas(
      SETTINGS.dimensions[SETTINGS.dimension].qrcode.width,
      SETTINGS.dimensions[SETTINGS.dimension].qrcode.height
    );

    return this.fillCanvasWithQRCode(canvas, id);
  }

  public pngStream(id: string): PNGStream {
    return this.canvas(id).createPNGStream();
  }

  private fillCanvasWithQRCode(canvas: Canvas, id: string): Canvas {
    QRCode.toCanvas(
      canvas,
      id,
      {
        margin: SETTINGS.dimensions[SETTINGS.dimension].qrcode.margin,
        scale: SETTINGS.dimensions[SETTINGS.dimension].qrcode.scale,
        errorCorrectionLevel: "H"
      },
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
