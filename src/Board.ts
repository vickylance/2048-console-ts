import chalk from "chalk";
import table from "tty-table";
import configstore from "configstore";
import packageJson from "../package.json";
import { differenceWith, isEqual, cloneDeep } from "lodash";

const config = new configstore(packageJson.name);

export enum SlideDirection {
  Right,
  Left,
  Up,
  Down
}

/**
 * The Board class takes care of spawning a new Game and managing the game state.
 *
 * @export
 * @class Board
 */
export default class Board {
  private grid: number[][];
  private boardRender!: any;
  private size: number;
  private multiplier: number;
  private renderOptions?: object;
  private _score: number;
  private _highScore: number;

  /**
   * Gets the current score
   *
   * @readonly
   * @memberof Board
   */
  public get score() {
    return this._score;
  }

  /**
   * Gets the high score
   *
   * @readonly
   * @memberof Board
   */
  public get highScore() {
    return this._highScore;
  }

  /**
   * Takes care of the coloring of the cells in the grid depending upon the value
   *
   * @private
   * @memberof Board
   */
  private colorFormatter = (val: number) => {
    switch (val) {
      case 0 * this.multiplier:
        return chalk.black.bgBlackBright("");
      case 1 * this.multiplier:
        return chalk.black.bgGreenBright(val.toString());
      case 2 * this.multiplier:
        return chalk.black.bgGreen(val.toString());
      case 4 * this.multiplier:
        return chalk.white.bgBlueBright(val.toString());
      case 8 * this.multiplier:
        return chalk.white.bgBlue(val.toString());
      case 16 * this.multiplier:
        return chalk.black.bgCyanBright(val.toString());
      case 32 * this.multiplier:
        return chalk.black.bgCyan(val.toString());
      case 64 * this.multiplier:
        return chalk.black.bgMagentaBright(val.toString());
      case 128 * this.multiplier:
        return chalk.black.bgMagenta(val.toString());
      case 256 * this.multiplier:
        return chalk.black.bgYellowBright(val.toString());
      case 512 * this.multiplier:
        return chalk.black.bgYellow(val.toString());
      case 1024 * this.multiplier:
        return chalk.white.bgRedBright(val.toString());
      case 2048 * this.multiplier:
        return chalk.white.bgRed(val.toString());
      default:
        return chalk.black.bgWhite(val.toString());
    }
  };

  constructor(size = 4, multiplier = 2) {
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
    this._highScore = config.get(`2048_high_score_${this.multiplier}`) || 0;
  }

  /**
   *
   *
   * @memberof Board
   */
  public renderBoard() {
    this.boardRender = table([], this.grid, [], this.renderOptions);
    console.log(this.boardRender.render());
  }

  /**
   * Renders an Info panel to the console about the game status and instructions
   *
   * @param {boolean} endGame Indicate if the game was over
   * @memberof Board
   */
  public renderInfoPanel(endGame: boolean) {
    console.log(`
===============================================
${chalk.yellow("Controls")}: use arrow keys ${chalk.yellow(
      "(↑,↓,←,→)"
    )} or ${chalk.yellow("(W,A,S,D)")}
===============================================
    `);
    console.log(
      `HIGH SCORE: ${chalk.black.bgGreenBright(this._highScore.toString())}\n`
    );
    console.log(
      `TOTAL SCORE: ${chalk.black.bgGreenBright(this._score.toString())}`
    );
    if (this.isGameOver()) {
      console.log(`NO MORE MOVES :( - ${chalk.bgRed.white("GAME OVER")}`);
      endGame = true;
    }
    if (this.isGameWon()) {
      console.log(
        `\n${chalk.bgYellow.black(
          "CONGRATULATIONS"
        )} - YOU REACHED ${chalk.bgYellow.black("2048")}\n`
      );
      if (!endGame) console.log(`\nYOU CAN CONTINUE TO PLAY THE GAME.\n`);
    }
    console.log(`\nPress ${chalk.yellow("Ctrl + C")} to exit`);
  }

  /**
   * Add a new random number (2 or 4) on the grid
   *
   * @memberof Board
   */
  public addNumber() {
    let emptyCells = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
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
      let spot = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      let r = Math.random();
      console.log(this.multiplier);
      this.grid[spot.x][spot.y] =
        r > 0.3 ? 1 * this.multiplier : 2 * this.multiplier;
    }
  }

  /**
   * Takes in an row of numbers and returns a new shifted row.
   *
   * @param {number[]} row The row of numbers to shift
   * @returns A new array with shifted row
   * @memberof Board
   */
  public slideRow(row: number[]) {
    let arr = row.filter(val => val); // filter non zero values
    let missing = this.size - arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
  }

  /**
   * Takes in an row of numbers and combines the numbers in them.
   * And returns a new array of combined numbers.
   *
   * @param {number[]} row The row of numbers to combine
   * @returns A new row array with combined numbers from right to left
   * @memberof Board
   */
  public combineRow(row: number[]) {
    for (let i = this.size - 1; i >= 1; i--) {
      let a = row[i];
      let b = row[i - 1];
      if (a === b) {
        row[i] = a + b;
        this.manageScore(row[i]);
        row[i - 1] = 0;
      }
    }
    return row;
  }

  private manageScore(score: number) {
    this._score += score;
    if (this._highScore < this._score) {
      config.set(`2048_high_score_${this.multiplier}`, this._score);
      this._highScore = config.get(`2048_high_score_${this.multiplier}`);
    }
  }

  /**
   * Takes in a row of numbers and slides it once,
   * combines it and slide it again and returns a new array.
   *
   * @param {number[]} row The row of numbers to do the operation on.
   * @returns {number[]} A new row with the operation
   * @memberof Board
   */
  public operateRow(row: number[]): number[] {
    let newRow = cloneDeep(row);
    newRow = this.slideRow(newRow);
    newRow = this.combineRow(newRow);
    newRow = this.slideRow(newRow);
    return newRow;
  }

  /**
   * Compares 2 grids and returns true if the 2 grids are different
   *
   * @param {number[][]} grid1 The grid1(2d array) to compare
   * @param {number[][]} grid2 The grid2(2d array) to compare
   * @returns {boolean} Returns true if there is difference between the 2 grids
   * @memberof Board
   */
  public compareGrid(grid1: number[][], grid2: number[][]): boolean {
    if (differenceWith(grid1, grid2, isEqual).length === 0) {
      return false;
    }
    return true;
  }

  /**
   * Creates a new empty grid of zeros and returns it.
   *
   * @param {number} n The number of rows
   * @param {number} m The number of columns
   * @returns {number[][]} An empty 2d grid with zeros.
   * @memberof Board
   */
  public blankGrid(n: number, m: number): number[][] {
    // returns a new grid
    let newGrid: number[][] = [];
    for (var i = 0; i < n; i++) {
      newGrid.push(new Array(m).fill(0));
    }
    return newGrid;
  }

  /**
   * Takes in a grid(2d array) and returns a new flipped array
   *
   * @param {number[][]} grid Takes in a 2d array
   * @returns {number[][]} Returns a new flipped 2d array
   * @memberof Board
   */
  public flipGrid(grid: number[][]): number[][] {
    // returns a new grid
    let newGrid = cloneDeep(this.grid);
    for (let i = 0; i < newGrid.length; i++) {
      newGrid[i].reverse();
    }
    return newGrid;
  }

  /**
   * Takes in a grid(2d array) and returns a new transposed array
   *
   * @param {number[][]} grid Takes in a grid(2d array)
   * @returns {number[][]} Returns a new transposed 2d array
   * @memberof Board
   */
  public rotateGrid(grid: number[][]): number[][] {
    // returns a new grid
    let newGrid = this.blankGrid(grid.length, grid[0].length);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        newGrid[i][j] = grid[j][i];
      }
    }
    return newGrid;
  }

  /**
   * Check if the game is won if 2048 tile has been reached.
   *
   * @returns {boolean} Returns true if 2048 tile is reached
   * @memberof Board
   */
  public isGameWon(): boolean {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] >= 1024 * this.multiplier) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Checks if the game is over if there are no more moves possible.
   *
   * @returns {boolean} Returns true if the game is over
   * @memberof Board
   */
  public isGameOver(): boolean {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] == 0) {
          return false;
        }
        if (
          i !== this.grid.length - 1 &&
          this.grid[i][j] === this.grid[i + 1][j]
        ) {
          return false;
        }
        if (
          j !== this.grid[i].length - 1 &&
          this.grid[i][j] === this.grid[i][j + 1]
        ) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Slides the grid in the given direction
   *
   * @param {SlideDirection} direction The direction in which you want to slide the grid
   * @memberof Board
   */
  public slide(direction: SlideDirection) {
    let flipped = false;
    let rotated = false;
    let played = true;
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
      let pastGrid = cloneDeep(this.grid);
      for (let i = 0; i < this.size; i++) {
        this.grid[i] = this.operateRow(this.grid[i]);
      }
      let changed = this.compareGrid(pastGrid, this.grid);
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
  }
}
