import test from "ava";
import { qrCodeGenerator } from "./qrcode-generator";
import { Canvas, PNGStream } from "canvas";

test("createCanvas() should reject if no id is provided", t => {
  t.throws(() => qrCodeGenerator.canvas(null as any), {
    instanceOf: TypeError,
    message: /id is empty or undefined/
  });
});

test("createCanvas() should return a canvas", t => {
  const result = qrCodeGenerator.canvas("id123");
  t.true(result instanceof Canvas);
});

test("createPNGStream() should reject if no id is provided", t => {
  t.throws(() => qrCodeGenerator.pngStream(null as any), {
    instanceOf: TypeError,
    message: /id is empty or undefined/
  });
});

test("createPNGStream() should return a PNGStream", t => {
  const result = qrCodeGenerator.pngStream("abc");
  t.true(result instanceof PNGStream);
});
