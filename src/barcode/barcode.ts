import * as JsBarcode from "jsbarcode";
import { Canvas, PNGStream } from "canvas";

class Barcode {
  private _height: number;
  private _width: number;

  constructor() {
    this._height = 400;
    this._width = 880;
  }

  public createCanvas(id: string): Canvas {
    const canvas = new Canvas(this._width, this._height);

    JsBarcode(canvas, id, {
      fontSize: 50,
      width: 6,
      height: 350,
      margin: 5,
      marginBottom: 20,
      text: "BL-" + id
    });
    return canvas;
  }

  public createPNGStream(id: string): PNGStream {
    const canvas = this.createCanvas(id);
    return canvas.createPNGStream();
  }
}

export const barcode = new Barcode();
