import Board from "../src/Board";
import { expect } from "chai";
import "mocha";

describe("Combine function - size 4", () => {
  let operands: any = {
    "[2,2,2,2]": [0, 4, 0, 4],
    "[0,2,2,2]": [0, 2, 0, 4],
    "[0,2,8,8]": [0, 2, 0, 16]
  };

  let board: Board;
  beforeEach(() => {
    board = new Board(4);
  });

  for (let key in operands) {
    let o: number[] = operands[key];
    it(`should slide row on ${key} as [${o}]`, () => {
      const result = board.combineRow(JSON.parse(key));
      expect(result).to.eql(o);
    });
  }
});

describe("Combine function - size 6", () => {
  let operands: any = {
    "[2,2,2,2,2,2]": [0, 4, 0, 4, 0, 4],
    "[0,2,4,2,4,2]": [0, 2, 4, 2, 4, 2],
    "[0,2,4,2,0,0]": [0, 2, 4, 2, 0, 0],
    "[0,2,4,4,0,0]": [0, 2, 0, 8, 0, 0],
    "[32,2,4,8,16,0]": [32, 2, 4, 8, 16, 0]
  };

  let board: Board;
  beforeEach(() => {
    board = new Board(6);
  });

  for (let key in operands) {
    let o: number[] = operands[key];
    it(`should slide row on ${key} as [${o}]`, () => {
      const result = board.combineRow(JSON.parse(key));
      expect(result).to.eql(o);
    });
  }
});

describe("Combine function - size 9", () => {
  let operands: any = {
    "[2,2,2,2,2,2,2,2,2]": [2, 0, 4, 0, 4, 0, 4, 0, 4]
  };

  let board: Board;
  beforeEach(() => {
    board = new Board(9);
  });

  for (let key in operands) {
    let o: number[] = operands[key];
    it(`should slide row on ${key} as [${o}]`, () => {
      const result = board.combineRow(JSON.parse(key));
      expect(result).to.eql(o);
    });
  }
});

describe("Slide Row function - size 4", () => {
  let operands: any = {
    "[2,2,2,2]": [2, 2, 2, 2],
    "[0,2,2,2]": [0, 2, 2, 2],
    "[0,2,8,8]": [0, 2, 8, 8]
  };
  let board: Board;
  beforeEach(() => {
    board = new Board(4);
  });

  for (let key in operands) {
    let o: number[] = operands[key];
    it(`should slide row on ${key} as [${o}]`, () => {
      const result = board.slideRow(JSON.parse(key));
      expect(result).to.eql(o);
    });
  }
});

describe("Slide Row function - size 6", () => {
  let operands: any = {
    "[2,2,2,2,2,2]": [2, 2, 2, 2, 2, 2],
    "[0,2,4,2,4,2]": [0, 2, 4, 2, 4, 2],
    "[0,2,4,2,0,0]": [0, 0, 0, 2, 4, 2],
    "[0,2,4,4,0,0]": [0, 0, 0, 2, 4, 4],
    "[32,2,4,8,16,0]": [0, 32, 2, 4, 8, 16]
  };

  let board: Board;
  beforeEach(() => {
    board = new Board(6);
  });

  for (let key in operands) {
    let o: number[] = operands[key];
    it(`should slide row on ${key} as [${o}]`, () => {
      const result = board.slideRow(JSON.parse(key));
      expect(result).to.eql(o);
    });
  }
});

describe("Slide row function - size 9", () => {
  let operands: any = {
    "[2,0,2,0,2,0,2,0,2]": [0, 0, 0, 0, 2, 2, 2, 2, 2]
  };

  let board: Board;
  beforeEach(() => {
    board = new Board(9);
  });

  for (let key in operands) {
    let o: number[] = operands[key];
    it(`should slide row on ${key} as [${o}]`, () => {
      const result = board.slideRow(JSON.parse(key));
      expect(result).to.eql(o);
    });
  }
});

describe("Operate function - size 4", () => {
  let operands: any = {
    "[2,2,2,2]": [0, 0, 4, 4],
    "[0,2,2,2]": [0, 0, 2, 4],
    "[0,2,8,8]": [0, 0, 2, 16]
  };

  let board: Board;
  beforeEach(() => {
    board = new Board(4);
  });

  for (let key in operands) {
    let o: number[] = operands[key];
    it(`should slide row on ${key} as [${o}]`, () => {
      const result = board.operateRow(JSON.parse(key));
      expect(result).to.eql(o);
    });
  }
});

describe("Operate function - size 6", () => {
  let operands: any = {
    "[2,2,2,2,2,2]": [0, 0, 0, 4, 4, 4],
    "[0,2,4,2,4,2]": [0, 2, 4, 2, 4, 2],
    "[0,2,4,2,0,0]": [0, 0, 0, 2, 4, 2],
    "[0,2,4,4,0,0]": [0, 0, 0, 0, 2, 8],
    "[32,2,4,8,16,0]": [0, 32, 2, 4, 8, 16]
  };

  let board: Board;
  beforeEach(() => {
    board = new Board(6);
  });

  for (let key in operands) {
    let o: number[] = operands[key];
    it(`should slide row on ${key} as [${o}]`, () => {
      const result = board.operateRow(JSON.parse(key));
      expect(result).to.eql(o);
    });
  }
});

describe("Operate function - size 9", () => {
  let operands: any = {
    "[2,2,2,2,2,2,2,2,2]": [0, 0, 0, 0, 2, 4, 4, 4, 4]
  };

  let board: Board;
  beforeEach(() => {
    board = new Board(9);
  });

  for (let key in operands) {
    let o: number[] = operands[key];
    it(`should slide row on ${key} as [${o}]`, () => {
      const result = board.operateRow(JSON.parse(key));
      expect(result).to.eql(o);
    });
  }
});
