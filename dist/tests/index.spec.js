"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = __importDefault(require("../src/Board"));
var chai_1 = require("chai");
require("mocha");
describe("Combine function - size 4", function () {
    var operands = {
        "[2,2,2,2]": [0, 4, 0, 4],
        "[0,2,2,2]": [0, 2, 0, 4],
        "[0,2,8,8]": [0, 2, 0, 16]
    };
    var board;
    beforeEach(function () {
        board = new Board_1.default(4);
    });
    var _loop_1 = function (key) {
        var o = operands[key];
        it("should slide row on " + key + " as [" + o + "]", function () {
            var result = board.combineRow(JSON.parse(key));
            chai_1.expect(result).to.eql(o);
        });
    };
    for (var key in operands) {
        _loop_1(key);
    }
});
describe("Combine function - size 6", function () {
    var operands = {
        "[2,2,2,2,2,2]": [0, 4, 0, 4, 0, 4],
        "[0,2,4,2,4,2]": [0, 2, 4, 2, 4, 2],
        "[0,2,4,2,0,0]": [0, 2, 4, 2, 0, 0],
        "[0,2,4,4,0,0]": [0, 2, 0, 8, 0, 0],
        "[32,2,4,8,16,0]": [32, 2, 4, 8, 16, 0]
    };
    var board;
    beforeEach(function () {
        board = new Board_1.default(6);
    });
    var _loop_2 = function (key) {
        var o = operands[key];
        it("should slide row on " + key + " as [" + o + "]", function () {
            var result = board.combineRow(JSON.parse(key));
            chai_1.expect(result).to.eql(o);
        });
    };
    for (var key in operands) {
        _loop_2(key);
    }
});
describe("Combine function - size 9", function () {
    var operands = {
        "[2,2,2,2,2,2,2,2,2]": [2, 0, 4, 0, 4, 0, 4, 0, 4]
    };
    var board;
    beforeEach(function () {
        board = new Board_1.default(9);
    });
    var _loop_3 = function (key) {
        var o = operands[key];
        it("should slide row on " + key + " as [" + o + "]", function () {
            var result = board.combineRow(JSON.parse(key));
            chai_1.expect(result).to.eql(o);
        });
    };
    for (var key in operands) {
        _loop_3(key);
    }
});
describe("Slide Row function - size 4", function () {
    var operands = {
        "[2,2,2,2]": [2, 2, 2, 2],
        "[0,2,2,2]": [0, 2, 2, 2],
        "[0,2,8,8]": [0, 2, 8, 8]
    };
    var board;
    beforeEach(function () {
        board = new Board_1.default(4);
    });
    var _loop_4 = function (key) {
        var o = operands[key];
        it("should slide row on " + key + " as [" + o + "]", function () {
            var result = board.slideRow(JSON.parse(key));
            chai_1.expect(result).to.eql(o);
        });
    };
    for (var key in operands) {
        _loop_4(key);
    }
});
describe("Slide Row function - size 6", function () {
    var operands = {
        "[2,2,2,2,2,2]": [2, 2, 2, 2, 2, 2],
        "[0,2,4,2,4,2]": [0, 2, 4, 2, 4, 2],
        "[0,2,4,2,0,0]": [0, 0, 0, 2, 4, 2],
        "[0,2,4,4,0,0]": [0, 0, 0, 2, 4, 4],
        "[32,2,4,8,16,0]": [0, 32, 2, 4, 8, 16]
    };
    var board;
    beforeEach(function () {
        board = new Board_1.default(6);
    });
    var _loop_5 = function (key) {
        var o = operands[key];
        it("should slide row on " + key + " as [" + o + "]", function () {
            var result = board.slideRow(JSON.parse(key));
            chai_1.expect(result).to.eql(o);
        });
    };
    for (var key in operands) {
        _loop_5(key);
    }
});
describe("Slide row function - size 9", function () {
    var operands = {
        "[2,0,2,0,2,0,2,0,2]": [0, 0, 0, 0, 2, 2, 2, 2, 2]
    };
    var board;
    beforeEach(function () {
        board = new Board_1.default(9);
    });
    var _loop_6 = function (key) {
        var o = operands[key];
        it("should slide row on " + key + " as [" + o + "]", function () {
            var result = board.slideRow(JSON.parse(key));
            chai_1.expect(result).to.eql(o);
        });
    };
    for (var key in operands) {
        _loop_6(key);
    }
});
describe("Operate function - size 4", function () {
    var operands = {
        "[2,2,2,2]": [0, 0, 4, 4],
        "[0,2,2,2]": [0, 0, 2, 4],
        "[0,2,8,8]": [0, 0, 2, 16]
    };
    var board;
    beforeEach(function () {
        board = new Board_1.default(4);
    });
    var _loop_7 = function (key) {
        var o = operands[key];
        it("should slide row on " + key + " as [" + o + "]", function () {
            var result = board.operateRow(JSON.parse(key));
            chai_1.expect(result).to.eql(o);
        });
    };
    for (var key in operands) {
        _loop_7(key);
    }
});
describe("Operate function - size 6", function () {
    var operands = {
        "[2,2,2,2,2,2]": [0, 0, 0, 4, 4, 4],
        "[0,2,4,2,4,2]": [0, 2, 4, 2, 4, 2],
        "[0,2,4,2,0,0]": [0, 0, 0, 2, 4, 2],
        "[0,2,4,4,0,0]": [0, 0, 0, 0, 2, 8],
        "[32,2,4,8,16,0]": [0, 32, 2, 4, 8, 16]
    };
    var board;
    beforeEach(function () {
        board = new Board_1.default(6);
    });
    var _loop_8 = function (key) {
        var o = operands[key];
        it("should slide row on " + key + " as [" + o + "]", function () {
            var result = board.operateRow(JSON.parse(key));
            chai_1.expect(result).to.eql(o);
        });
    };
    for (var key in operands) {
        _loop_8(key);
    }
});
describe("Operate function - size 9", function () {
    var operands = {
        "[2,2,2,2,2,2,2,2,2]": [0, 0, 0, 0, 2, 4, 4, 4, 4]
    };
    var board;
    beforeEach(function () {
        board = new Board_1.default(9);
    });
    var _loop_9 = function (key) {
        var o = operands[key];
        it("should slide row on " + key + " as [" + o + "]", function () {
            var result = board.operateRow(JSON.parse(key));
            chai_1.expect(result).to.eql(o);
        });
    };
    for (var key in operands) {
        _loop_9(key);
    }
});
//# sourceMappingURL=index.spec.js.map