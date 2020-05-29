import * as JsBarcode from "jsbarcode";
import { Canvas, PNGStream } from "canvas";
import * as fs from "fs";

class Barcode {
  private _height: number;
  private _width: number;

  constructor() {
    this._height = 271;
    this._width = 696;
  }

  public print(id: string, stream: PNGStream) {
    const out = fs.createWriteStream(__dirname + `/output/${id}.png`);
    stream.pipe(out);
    out.on("finish", () => console.log(`PNG ${id}.png created`));
  }

  public createPNGStream(id: string): PNGStream {
    const canvas = new Canvas(this._width, this._height);

    JsBarcode(canvas, id, {
      fontSize: 20,
      width: 2,
      height: 100,
      margin: 5,
      marginBottom: 10
    });

    const printCanvas = new Canvas(this._width, this._height);
    const printCtx = printCanvas.getContext("2d");

    printCtx.drawImage(canvas, 0, 0, this._width, this._height);

    return printCanvas.createPNGStream();
  }
}

export const barcode = new Barcode();
