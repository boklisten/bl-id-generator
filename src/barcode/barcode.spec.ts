import test from "ava";
import { barcode } from "./barcode";
import { PNGStream } from "canvas";

test("createPNGStream() should return a PNGStream", t => {
  const pngStream = barcode.createPNGStream("ABC");
  t.true(pngStream instanceof PNGStream);
});
