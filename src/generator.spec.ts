import test from "ava";

import { generator } from "./generator";

test("generate() should return a random identification string", t => {
  const id = generator.generate();

  t.is(typeof id, "string");
  t.is(id.length, 15);
});

test("generate() should return x number of unique ids", t => {
  const numberOfIds = [10, 1, 11, 8];

  for (let numOfIds of numberOfIds) {
    const ids = generator.generate(numOfIds);
    t.is(ids.length, numOfIds);
    t.is(typeof ids[0], "string");
    t.is(ids[0].length, 15);
    t.is(ids[0].charAt(0), "B");
    t.is(ids[0].charAt(1), "L");
    t.is(ids[0].charAt(2), "-");
  }
});
