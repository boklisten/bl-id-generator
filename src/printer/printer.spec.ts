import test from "ava";
import { printer } from "./printer";

test("print() should reject if no imagePaths are provided", async t => {
  await t.throwsAsync(printer.print([], 1), {
    instanceOf: TypeError,
    message: /imagePaths is empty or undefined/
  });
});

test("print() should reject if numberOfLabelsForEachImage is zero", async t => {
  await t.throwsAsync(printer.print(["somePath"], 0), {
    instanceOf: TypeError,
    message: /numberOfLabelsForEachImage must be at least 1/
  });
});
