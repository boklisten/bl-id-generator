import * as JsBarcode from "jsbarcode";
import { Canvas, PNGStream } from "canvas";

class BarcodeGenerator {
  private _height: number;
  private _width: number;

  constructor() {
    this._height = 400;
    this._width = 680;
  }

  public canvas(id: string): Canvas {
    this.validateId(id);

    const canvas = new Canvas(this._width, this._height);

    return this.fillCanvasWithBarcode(canvas, id);
  }

  public pngStream(id: string): PNGStream {
    const canvas = this.canvas(id);
    return canvas.createPNGStream();
  }

  private fillCanvasWithBarcode(canvas: Canvas, id: string): Canvas {
    JsBarcode(canvas, id, {
      fontSize: 50,
      width: 4,
      height: 230,
      margin: 5,
      marginBottom: 20,
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
