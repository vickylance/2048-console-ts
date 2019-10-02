"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var combine = function (row) {
    for (var i = row.length - 1; i >= 1; i--) {
        var a = row[i];
        var b = row[i - 1];
        if (a === b) {
            row[i] = a + b;
            row[i - 1] = 0;
        }
    }
    return row;
};
exports.combine = combine;
var slideRow = function (row) {
    var arr = row.filter(function (val) { return val; }); // filter non zero values
    var missing = row.length - arr.length;
    var zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
};
exports.slideRow = slideRow;
var operate = function (row) {
    row = slideRow(row);
    row = combine(row);
    row = slideRow(row);
    return row;
};
exports.operate = operate;
//# sourceMappingURL=units.js.map