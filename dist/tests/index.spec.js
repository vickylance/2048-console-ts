"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var units_1 = require("../src/units");
var chai_1 = require("chai");
require("mocha");
describe("Combine function", function () {
    var operands = {
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
    var _loop_1 = function (key) {
        var o = operands[key];
        it("should slide row on " + key + " as [" + o + "]", function () {
            var result = units_1.combine(JSON.parse(key));
            chai_1.expect(result).to.eql(o);
        });
    };
    for (var key in operands) {
        _loop_1(key);
    }
});
describe("Slide Row function", function () {
    var operands = {
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
    var _loop_2 = function (key) {
        var o = operands[key];
        it("should slide row on " + key + " as [" + o + "]", function () {
            var result = units_1.slideRow(JSON.parse(key));
            chai_1.expect(result).to.eql(o);
        });
    };
    for (var key in operands) {
        _loop_2(key);
    }
});
describe("Operate function", function () {
    var operands = {
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
    var _loop_3 = function (key) {
        var o = operands[key];
        it("should operate on " + key + " as [" + o + "]", function () {
            var result = units_1.operate(JSON.parse(key));
            chai_1.expect(result).to.eql(o);
        });
    };
    for (var key in operands) {
        _loop_3(key);
    }
});
//# sourceMappingURL=index.spec.js.map