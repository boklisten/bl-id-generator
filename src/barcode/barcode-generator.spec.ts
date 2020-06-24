import test from "ava";
import { barcodeGenerator } from "./barcode-generator";
import { PNGStream, Canvas } from "canvas";

test("createPNGStream() should return a PNGStream", t => {
  const result = barcodeGenerator.pngStream("ABC");
  t.true(result instanceof PNGStream);
});

test("createPNGStream() should throw error if id is not provided", t => {
  t.throws(() => barcodeGenerator.pngStream(null as any), {
    instanceOf: TypeError,
    message: /id is empty or undefined/
  });
});

test("createCanvas() should return a Canvas", t => {
  const result = barcodeGenerator.canvas("ABC");
  t.true(result instanceof Canvas);
});

test("createCanvas() should throw error if id is not provided", t => {
  t.throws(() => barcodeGenerator.canvas(null as any), {
    instanceOf: TypeError,
    message: /id is empty or undefined/
  });
});
