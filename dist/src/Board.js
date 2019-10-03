"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var tty_table_1 = __importDefault(require("tty-table"));
var configstore_1 = __importDefault(require("configstore"));
var package_json_1 = __importDefault(require("../package.json"));
var lodash_1 = require("lodash");
var config = new configstore_1.default(package_json_1.default.name);
var SlideDirection;
(function (SlideDirection) {
    SlideDirection[SlideDirection["Right"] = 0] = "Right";
    SlideDirection[SlideDirection["Left"] = 1] = "Left";
    SlideDirection[SlideDirection["Up"] = 2] = "Up";
    SlideDirection[SlideDirection["Down"] = 3] = "Down";
})(SlideDirection = exports.SlideDirection || (exports.SlideDirection = {}));
/**
 * The Board class takes care of spawning a new Game and managing the game state.
 *
 * @export
 * @class Board
 */
var Board = /** @class */ (function () {
    function Board(size, multiplier) {
        var _this = this;
        if (size === void 0) { size = 4; }
        if (multiplier === void 0) { multiplier = 2; }
        /**
         * Takes care of the coloring of the cells in the grid depending upon the value
         *
         * @private
         * @memberof Board
         */
        this.colorFormatter = function (val) {
            switch (val) {
                case 0 * _this.multiplier:
                    return chalk_1.default.black.bgBlackBright("");
                case 1 * _this.multiplier:
                    return chalk_1.default.black.bgGreenBright(val.toString());
                case 2 * _this.multiplier:
                    return chalk_1.default.black.bgGreen(val.toString());
                case 4 * _this.multiplier:
                    return chalk_1.default.white.bgBlueBright(val.toString());
                case 8 * _this.multiplier:
                    return chalk_1.default.white.bgBlue(val.toString());
                case 16 * _this.multiplier:
                    return chalk_1.default.black.bgCyanBright(val.toString());
                case 32 * _this.multiplier:
                    return chalk_1.default.black.bgCyan(val.toString());
                case 64 * _this.multiplier:
                    return chalk_1.default.black.bgMagentaBright(val.toString());
                case 128 * _this.multiplier:
                    return chalk_1.default.black.bgMagenta(val.toString());
                case 256 * _this.multiplier:
                    return chalk_1.default.black.bgYellowBright(val.toString());
                case 512 * _this.multiplier:
                    return chalk_1.default.black.bgYellow(val.toString());
                case 1024 * _this.multiplier:
                    return chalk_1.default.white.bgRedBright(val.toString());
                case 2048 * _this.multiplier:
                    return chalk_1.default.white.bgRed(val.toString());
                default:
                    return chalk_1.default.black.bgWhite(val.toString());
            }
        };
        this.size = size;
        this.multiplier = multiplier;
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
            formatter: this.colorFormatter
        };
        this.grid = this.blankGrid(this.size, this.size);
        this._score = 0;
        this._highScore = config.get("2048_high_score_" + this.multiplier) || 0;
    }
    Object.defineProperty(Board.prototype, "score", {
        /**
         * Gets the current score
         *
         * @readonly
         * @memberof Board
         */
        get: function () {
            return this._score;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "highScore", {
        /**
         * Gets the high score
         *
         * @readonly
         * @memberof Board
         */
        get: function () {
            return this._highScore;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     *
     * @memberof Board
     */
    Board.prototype.renderBoard = function () {
        this.boardRender = tty_table_1.default([], this.grid, [], this.renderOptions);
        console.log(this.boardRender.render());
    };
    /**
     * Renders an Info panel to the console about the game status and instructions
     *
     * @param {boolean} endGame Indicate if the game was over
     * @memberof Board
     */
    Board.prototype.renderInfoPanel = function (endGame) {
        console.log("\n===============================================\n" + chalk_1.default.yellow("Controls") + ": use arrow keys " + chalk_1.default.yellow("(↑,↓,←,→)") + " or " + chalk_1.default.yellow("(W,A,S,D)") + "\n===============================================\n    ");
        console.log("HIGH SCORE: " + chalk_1.default.black.bgGreenBright(this._highScore.toString()) + "\n");
        console.log("TOTAL SCORE: " + chalk_1.default.black.bgGreenBright(this._score.toString()));
        if (this.isGameOver()) {
            console.log("NO MORE MOVES :( - " + chalk_1.default.bgRed.white("GAME OVER"));
            endGame = true;
        }
        if (this.isGameWon()) {
            console.log("\n" + chalk_1.default.bgYellow.black("CONGRATULATIONS") + " - YOU REACHED " + chalk_1.default.bgYellow.black("2048") + "\n");
            if (!endGame)
                console.log("\nYOU CAN CONTINUE TO PLAY THE GAME.\n");
        }
        console.log("\nPress " + chalk_1.default.yellow("Ctrl + C") + " to exit");
    };
    /**
     * Add a new random number (2 or 4) on the grid
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
            console.log(this.multiplier);
            this.grid[spot.x][spot.y] =
                r > 0.3 ? 1 * this.multiplier : 2 * this.multiplier;
        }
    };
    /**
     * Takes in an row of numbers and returns a new shifted row.
     *
     * @param {number[]} row The row of numbers to shift
     * @returns A new array with shifted row
     * @memberof Board
     */
    Board.prototype.slideRow = function (row) {
        var arr = row.filter(function (val) { return val; }); // filter non zero values
        var missing = this.size - arr.length;
        var zeros = Array(missing).fill(0);
        arr = zeros.concat(arr);
        return arr;
    };
    /**
     * Takes in an row of numbers and combines the numbers in them.
     * And returns a new array of combined numbers.
     *
     * @param {number[]} row The row of numbers to combine
     * @returns A new row array with combined numbers from right to left
     * @memberof Board
     */
    Board.prototype.combineRow = function (row) {
        for (var i = this.size - 1; i >= 1; i--) {
            var a = row[i];
            var b = row[i - 1];
            if (a === b) {
                row[i] = a + b;
                this.manageScore(row[i]);
                row[i - 1] = 0;
            }
        }
        return row;
    };
    Board.prototype.manageScore = function (score) {
        this._score += score;
        if (this._highScore < this._score) {
            config.set("2048_high_score_" + this.multiplier, this._score);
            this._highScore = config.get("2048_high_score_" + this.multiplier);
        }
    };
    /**
     * Takes in a row of numbers and slides it once,
     * combines it and slide it again and returns a new array.
     *
     * @param {number[]} row The row of numbers to do the operation on.
     * @returns {number[]} A new row with the operation
     * @memberof Board
     */
    Board.prototype.operateRow = function (row) {
        var newRow = lodash_1.cloneDeep(row);
        newRow = this.slideRow(newRow);
        newRow = this.combineRow(newRow);
        newRow = this.slideRow(newRow);
        return newRow;
    };
    /**
     * Compares 2 grids and returns true if the 2 grids are different
     *
     * @param {number[][]} grid1 The grid1(2d array) to compare
     * @param {number[][]} grid2 The grid2(2d array) to compare
     * @returns {boolean} Returns true if there is difference between the 2 grids
     * @memberof Board
     */
    Board.prototype.compareGrid = function (grid1, grid2) {
        if (lodash_1.differenceWith(grid1, grid2, lodash_1.isEqual).length === 0) {
            return false;
        }
        return true;
    };
    /**
     * Creates a new empty grid of zeros and returns it.
     *
     * @param {number} n The number of rows
     * @param {number} m The number of columns
     * @returns {number[][]} An empty 2d grid with zeros.
     * @memberof Board
     */
    Board.prototype.blankGrid = function (n, m) {
        // returns a new grid
        var newGrid = [];
        for (var i = 0; i < n; i++) {
            newGrid.push(new Array(m).fill(0));
        }
        return newGrid;
    };
    /**
     * Takes in a grid(2d array) and returns a new flipped array
     *
     * @param {number[][]} grid Takes in a 2d array
     * @returns {number[][]} Returns a new flipped 2d array
     * @memberof Board
     */
    Board.prototype.flipGrid = function (grid) {
        // returns a new grid
        var newGrid = lodash_1.cloneDeep(this.grid);
        for (var i = 0; i < newGrid.length; i++) {
            newGrid[i].reverse();
        }
        return newGrid;
    };
    /**
     * Takes in a grid(2d array) and returns a new transposed array
     *
     * @param {number[][]} grid Takes in a grid(2d array)
     * @returns {number[][]} Returns a new transposed 2d array
     * @memberof Board
     */
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
    /**
     * Check if the game is won if 2048 tile has been reached.
     *
     * @returns {boolean} Returns true if 2048 tile is reached
     * @memberof Board
     */
    Board.prototype.isGameWon = function () {
        for (var i = 0; i < this.grid.length; i++) {
            for (var j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j] >= 1024 * this.multiplier) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Checks if the game is over if there are no more moves possible.
     *
     * @returns {boolean} Returns true if the game is over
     * @memberof Board
     */
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
    /**
     * Slides the grid in the given direction
     *
     * @param {SlideDirection} direction The direction in which you want to slide the grid
     * @memberof Board
     */
    Board.prototype.slide = function (direction) {
        var flipped = false;
        var rotated = false;
        var played = true;
        switch (direction) {
            case SlideDirection.Right:
                break;
            case SlideDirection.Left:
                this.grid = this.flipGrid(this.grid);
                flipped = true;
                break;
            case SlideDirection.Up:
                this.grid = this.rotateGrid(this.grid);
                this.grid = this.flipGrid(this.grid);
                rotated = true;
                flipped = true;
                break;
            case SlideDirection.Down:
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
    return Board;
}());
exports.default = Board;
//# sourceMappingURL=Board.js.map