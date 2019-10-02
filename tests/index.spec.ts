import { combine, operate, slideRow } from "../src/units";
import { expect } from "chai";
import "mocha";

describe("Combine function", () => {
  let operands: any = {
    "[2,2,2,2]": [0, 4, 0, 4],
    "[0,2,2,2]": [0, 2, 0, 4],
    "[2,2,2,2,2,2]": [0, 4, 0, 4, 0, 4],
    "[2,2,2,2,2,2,2,2,2]": [2, 0, 4, 0, 4, 0, 4, 0, 4],
    "[0,2,8,8]": [0, 2, 0, 16],
    "[0,2,4,2,4,2]": [0, 2, 4, 2, 4, 2],
    "[0,2,4,2,0,0]": [0, 2, 4, 2, 0, 0],
    "[0,2,4,4,0,0]": [0, 2, 0, 8, 0, 0],
    "[32,2,4,8,16,0]": [32, 2, 4, 8, 16, 0]
  };

  for (let key in operands) {
    let o: number[] = operands[key];
    it(`should slide row on ${key} as [${o}]`, () => {
      const result = combine(JSON.parse(key));
      expect(result).to.eql(o);
    });
  }
});

describe("Slide Row function", () => {
  let operands: any = {
    "[2,2,2,2]": [2, 2, 2, 2],
    "[0,2,2,2]": [0, 2, 2, 2],
    "[2,2,2,2,2,2]": [2, 2, 2, 2, 2, 2],
    "[2,0,2,0,2,0,2,0,2]": [0, 0, 0, 0, 2, 2, 2, 2, 2],
    "[0,2,8,8]": [0, 2, 8, 8],
    "[0,2,4,2,4,2]": [0, 2, 4, 2, 4, 2],
    "[0,2,4,2,0,0]": [0, 0, 0, 2, 4, 2],
    "[0,2,4,4,0,0]": [0, 0, 0, 2, 4, 4],
    "[32,2,4,8,16,0]": [0, 32, 2, 4, 8, 16]
  };
  for (let key in operands) {
    let o: number[] = operands[key];
    it(`should slide row on ${key} as [${o}]`, () => {
      const result = slideRow(JSON.parse(key));
      expect(result).to.eql(o);
    });
  }
});

describe("Operate function", () => {
  let operands: any = {
    "[2,2,2,2]": [0, 0, 4, 4],
    "[0,2,2,2]": [0, 0, 2, 4],
    "[2,2,2,2,2,2]": [0, 0, 0, 4, 4, 4],
    "[2,2,2,2,2,2,2,2,2]": [0, 0, 0, 0, 2, 4, 4, 4, 4],
    "[0,2,8,8]": [0, 0, 2, 16],
    "[0,2,4,2,4,2]": [0, 2, 4, 2, 4, 2],
    "[0,2,4,2,0,0]": [0, 0, 0, 2, 4, 2],
    "[0,2,4,4,0,0]": [0, 0, 0, 0, 2, 8],
    "[32,2,4,8,16,0]": [0, 32, 2, 4, 8, 16]
  };
  for (let key in operands) {
    let o: number[] = operands[key];
    it(`should operate on ${key} as [${o}]`, () => {
      const result = operate(JSON.parse(key));
      expect(result).to.eql(o);
    });
  }
});
