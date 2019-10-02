"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var tty_table_1 = __importDefault(require("tty-table"));
var figlet_1 = __importDefault(require("figlet"));
var clear_1 = __importDefault(require("clear"));
var lodash_1 = require("lodash");
var Board = /** @class */ (function () {
    function Board(size) {
        if (size === void 0) { size = 4; }
        this.size = size;
        this.renderOptions = {
            width: 7,
            borderColor: "blue",
            headerAlign: "center",
            align: "center",
            color: "white",
            borderCharacters: {
                solid: [
                    { v: "║", l: "╔", j: "╦", h: "═", r: "╗" },
                    { v: "║", l: "╠", j: "╬", h: "═", r: "╣" },
                    { v: "║", l: "╚", j: "╩", h: "═", r: "╝" }
                ]
            },
            formatter: Board.colorFormatter
        };
        this.grid = this.blankGrid(this.size, this.size);
        this._score = 0;
    }
    Object.defineProperty(Board.prototype, "score", {
        get: function () {
            return this._score;
        },
        enumerable: true,
        configurable: true
    });
    Board.prototype.renderBoard = function () {
        clear_1.default();
        console.log(chalk_1.default.yellow(figlet_1.default.textSync("2048", { horizontalLayout: "full" })));
        this.boardRender = tty_table_1.default([], this.grid, [], this.renderOptions);
        console.log(this.boardRender.render());
    };
    /**
     * Add a new random number (2 or 4) on the Board
     *
     * @memberof Board
     */
    Board.prototype.addNumber = function () {
        var emptyCells = [];
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                if (this.grid[i][j] === 0) {
                    emptyCells.push({
                        x: i,
                        y: j
                    });
                }
            }
        }
        if (emptyCells.length > 0) {
            // choose a random empty cell
            var spot = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            var r = Math.random();
            this.grid[spot.x][spot.y] = r > 0.4 ? 256 : 512;
            // this.grid_new[spot.x][spot.y] = 1;
        }
    };
    // returns new row
    Board.prototype.slideRow = function (row) {
        var arr = row.filter(function (val) { return val; }); // filter non zero values
        var missing = this.size - arr.length;
        var zeros = Array(missing).fill(0);
        arr = zeros.concat(arr);
        return arr;
    };
    Board.prototype.combineRow = function (row) {
        for (var i = this.size - 1; i >= 1; i--) {
            var a = row[i];
            var b = row[i - 1];
            if (a === b) {
                row[i] = a + b;
                this._score += row[i];
                row[i - 1] = 0;
            }
        }
        return row;
    };
    Board.prototype.operateRow = function (row) {
        row = this.slideRow(row);
        row = this.combineRow(row);
        row = this.slideRow(row);
        return row;
    };
    Board.prototype.compareGrid = function (grid1, grid2) {
        if (lodash_1.differenceWith(grid1, grid2, lodash_1.isEqual).length === 0) {
            return false;
        }
        return true;
    };
    Board.prototype.blankGrid = function (n, m) {
        // returns a new grid
        var newGrid = [];
        for (var i = 0; i < n; i++) {
            newGrid.push(new Array(m).fill(0));
        }
        return newGrid;
    };
    Board.prototype.flipGrid = function (grid) {
        // returns a new grid
        var newGrid = lodash_1.cloneDeep(this.grid);
        for (var i = 0; i < newGrid.length; i++) {
            newGrid[i].reverse();
        }
        return newGrid;
    };
    Board.prototype.rotateGrid = function (grid) {
        // returns a new grid
        var newGrid = this.blankGrid(grid.length, grid[0].length);
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                newGrid[i][j] = grid[j][i];
            }
        }
        return newGrid;
    };
    Board.prototype.isGameWon = function () {
        for (var i = 0; i < this.grid.length; i++) {
            for (var j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j] == 2048) {
                    return true;
                }
            }
        }
        return false;
    };
    Board.prototype.isGameOver = function () {
        for (var i = 0; i < this.grid.length; i++) {
            for (var j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j] == 0) {
                    return false;
                }
                if (i !== this.grid.length - 1 &&
                    this.grid[i][j] === this.grid[i + 1][j]) {
                    return false;
                }
                if (j !== this.grid[i].length - 1 &&
                    this.grid[i][j] === this.grid[i][j + 1]) {
                    return false;
                }
            }
        }
        return true;
    };
    Board.prototype.slide = function (keyCode) {
        var flipped = false;
        var rotated = false;
        var played = true;
        switch (keyCode) {
            case "right":
                break;
            case "left":
                this.grid = this.flipGrid(this.grid);
                flipped = true;
                break;
            case "up":
                this.grid = this.rotateGrid(this.grid);
                this.grid = this.flipGrid(this.grid);
                rotated = true;
                flipped = true;
                break;
            case "down":
                this.grid = this.rotateGrid(this.grid);
                rotated = true;
                break;
            default:
                played = false;
        }
        if (played) {
            var pastGrid = lodash_1.cloneDeep(this.grid);
            for (var i = 0; i < this.size; i++) {
                this.grid[i] = this.operateRow(this.grid[i]);
            }
            var changed = this.compareGrid(pastGrid, this.grid);
            if (flipped) {
                this.grid = this.flipGrid(this.grid);
            }
            if (rotated) {
                this.grid = this.rotateGrid(this.grid);
            }
            if (changed) {
                this.addNumber();
            }
        }
    };
    Board.colorFormatter = function (val) {
        switch (val) {
            case 0:
                return chalk_1.default.black.bgBlackBright("");
            case 2:
                return chalk_1.default.black.bgGreenBright(val.toString());
            case 4:
                return chalk_1.default.black.bgGreen(val.toString());
            case 8:
                return chalk_1.default.white.bgBlueBright(val.toString());
            case 16:
                return chalk_1.default.white.bgBlue(val.toString());
            case 32:
                return chalk_1.default.black.bgCyanBright(val.toString());
            case 64:
                return chalk_1.default.black.bgCyan(val.toString());
            case 128:
                return chalk_1.default.black.bgMagentaBright(val.toString());
            case 256:
                return chalk_1.default.black.bgMagenta(val.toString());
            case 512:
                return chalk_1.default.black.bgYellowBright(val.toString());
            case 1024:
                return chalk_1.default.black.bgYellow(val.toString());
            case 2048:
                return chalk_1.default.white.bgRedBright(val.toString());
            case 4096:
                return chalk_1.default.white.bgRed(val.toString());
            default:
                return chalk_1.default.black.bgWhite(val.toString());
        }
    };
    return Board;
}());
exports.default = Board;
//# sourceMappingURL=Board.js.map