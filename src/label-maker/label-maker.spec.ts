import test from "ava";
import { labelMaker } from "./label-maker";

test("createIdLabelPNGFile()", t => {
  t.throws(() => labelMaker.createIdLabelPNGFile(undefined as any), {
    instanceOf: TypeError,
    message: /id is empty or undefined/
  });
});
