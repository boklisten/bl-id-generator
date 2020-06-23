import { Canvas } from "canvas";
import * as fs from "fs";

class Printer {
  public printQrAndBarcode(
    id: string,
    qrcode: Canvas,
    barcode: Canvas,
    location: string
  ): void {
    const highestCanvas =
      barcode.height >= qrcode.height ? barcode.height : qrcode.height;
    const totalHeight = highestCanvas;
    const totalWidth = qrcode.width + barcode.width;
    const printCanvas = new Canvas(totalWidth, totalHeight);

    const printCtx = printCanvas.getContext("2d");

    printCtx.drawImage(qrcode, 0, 0);
    printCtx.drawImage(barcode, qrcode.width, 0);
    /*
    printCtx.drawImage(qrcode, 0, highestCanvas + heightMargin);
    printCtx.drawImage(barcode, qrcode.width, highestCanvas + heightMargin);
    */

    const stream = printCanvas.createPNGStream();

    const out = fs.createWriteStream(location + id + ".png");
    stream.pipe(out);

    out.on("finish", () => {
      console.log(`PNG ${id}.png created`);
    });
  }
}

export const printer = new Printer();
