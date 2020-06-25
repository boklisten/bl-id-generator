import * as JsBarcode from "jsbarcode";
import { Canvas, PNGStream } from "canvas";
import { SETTINGS } from "../settings";

class BarcodeGenerator {
  public canvas(id: string): Canvas {
    this.validateId(id);

    const canvas = new Canvas(
      SETTINGS.dimensions[SETTINGS.dimension].barcode.width,
      SETTINGS.dimensions[SETTINGS.dimension].barcode.height
    );

    return this.fillCanvasWithBarcode(canvas, id);
  }

  public pngStream(id: string): PNGStream {
    const canvas = this.canvas(id);
    return canvas.createPNGStream();
  }

  private fillCanvasWithBarcode(canvas: Canvas, id: string): Canvas {
    JsBarcode(canvas, id, {
      fontSize: SETTINGS.dimensions[SETTINGS.dimension].barcode.fontSize,
      width: SETTINGS.dimensions[SETTINGS.dimension].barcode.barcodeWidth,
      height: SETTINGS.dimensions[SETTINGS.dimension].barcode.barcodeHeight,
      margin: SETTINGS.dimensions[SETTINGS.dimension].barcode.margin,
      marginBottom:
        SETTINGS.dimensions[SETTINGS.dimension].barcode.marginBottom,
      text: "BL-" + id
    });
    return canvas;
  }

  private validateId(id: string) {
    if (!id || id.length <= 0) {
      throw new TypeError(
        "id is empty or undefined when trying to create barcode"
      );
    }
  }
}

export const barcodeGenerator = new BarcodeGenerator();
