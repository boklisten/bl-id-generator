import { barcodeGenerator } from "../barcode/barcode-generator";
import { qrCodeGenerator } from "../qrcode/qrcode-generator";
import { Canvas, PNGStream } from "canvas";
import * as fs from "fs";
import { SETTINGS } from "../settings";

class LabelMaker {
  private outputLocation: string;

  constructor() {
    this.outputLocation = "/home/ww/bl/bl-id-generator/output/";
  }

  public createIdLabelPNGFile(id: string): string {
    const printCanvas = this.combineQRCodeAndBarcode(id);
    const printPNGStream = printCanvas.createPNGStream();
    const pngLocation = this.createPNGFile(
      id,
      printPNGStream,
      this.outputLocation
    );

    return pngLocation;
  }

  private combineQRCodeAndBarcode(id: string): Canvas {
    const barcodeCanvas = barcodeGenerator.canvas(id);
    const qrcodeCanvas = qrCodeGenerator.canvas(id);
    const totalHeight = SETTINGS.dimensions[SETTINGS.dimension].label.height;
    const totalWidth = SETTINGS.dimensions[SETTINGS.dimension].label.width;
    const margin = SETTINGS.dimensions[SETTINGS.dimension].label.margin;

    const printCanvas = new Canvas(totalWidth, totalHeight);

    const printCtx = printCanvas.getContext("2d");
    printCtx.fillStyle = "white";
    printCtx.fillRect(0, 0, totalWidth, totalHeight);

    printCtx.drawImage(
      qrcodeCanvas,
      0,
      SETTINGS.dimensions[SETTINGS.dimension].qrcode.paddingTop
    );
    printCtx.drawImage(
      barcodeCanvas,
      qrcodeCanvas.width +
        SETTINGS.dimensions[SETTINGS.dimension].label.spaceBetween,
      0
    );

    return printCanvas;
  }

  private createPNGFile(
    id: string,
    pngStream: PNGStream,
    location: string
  ): string {
    const pngLocation = location + id + ".png";
    const out = fs.createWriteStream(pngLocation);
    pngStream.pipe(out);

    out.on("finish", () => {
      console.log(`PNG ${id}.png created`);
    });

    return pngLocation;
  }
}

export const labelMaker = new LabelMaker();
