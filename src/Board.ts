import chalk from "chalk";
import table from "tty-table";
import figlet from "figlet";
import clear from "clear";
import configstore from "configstore";
import packageJson from "../package.json";
import { differenceWith, isEqual, cloneDeep } from "lodash";

const config = new configstore(packageJson.name);

export default class Board {
  private grid: number[][];
  private boardRender!: any;
  private size: number;
  private renderOptions?: object;
  private _score: number;
  private _highScore: number;

  public get score() {
    return this._score;
  }

  public get highScore() {
    return this._highScore;
  }

  private static colorFormatter = (val: number) => {
    switch (val) {
      case 0:
        return chalk.black.bgBlackBright("");
      case 2:
        return chalk.black.bgGreenBright(val.toString());
      case 4:
        return chalk.black.bgGreen(val.toString());
      case 8:
        return chalk.white.bgBlueBright(val.toString());
      case 16:
        return chalk.white.bgBlue(val.toString());
      case 32:
        return chalk.black.bgCyanBright(val.toString());
      case 64:
        return chalk.black.bgCyan(val.toString());
      case 128:
        return chalk.black.bgMagentaBright(val.toString());
      case 256:
        return chalk.black.bgMagenta(val.toString());
      case 512:
        return chalk.black.bgYellowBright(val.toString());
      case 1024:
        return chalk.black.bgYellow(val.toString());
      case 2048:
        return chalk.white.bgRedBright(val.toString());
      case 4096:
        return chalk.white.bgRed(val.toString());
      default:
        return chalk.black.bgWhite(val.toString());
    }
  };

  constructor(size = 4) {
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
    this._highScore = config.get("2048_high_score") || 0;
  }

  public renderBoard() {
    clear();
    console.log(
      chalk.yellow(figlet.textSync("2048", { horizontalLayout: "full" }))
    );
    this.boardRender = table([], this.grid, [], this.renderOptions);
    console.log(this.boardRender.render());
  }

  public renderInfoPanel(endGame: boolean) {
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
    console.log("\nPress Ctrl + C to exit");
  }

  /**
   * Add a new random number (2 or 4) on the Board
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
      this.grid[spot.x][spot.y] = r > 0.4 ? 256 : 512;
      // this.grid_new[spot.x][spot.y] = 1;
    }
  }

  // returns new row
  public slideRow(row: number[]) {
    let arr = row.filter(val => val); // filter non zero values
    let missing = this.size - arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
  }

  public combineRow(row: number[]) {
    for (let i = this.size - 1; i >= 1; i--) {
      let a = row[i];
      let b = row[i - 1];
      if (a === b) {
        row[i] = a + b;
        this._score += row[i];
        if (this._highScore < this._score) {
          config.set("2048_high_score", this._score);
          this._highScore = config.get("2048_high_score");
        }
        row[i - 1] = 0;
      }
    }
    return row;
  }

  public operateRow(row: number[]): number[] {
    row = this.slideRow(row);
    row = this.combineRow(row);
    row = this.slideRow(row);
    return row;
  }

  public compareGrid(grid1: number[][], grid2: number[][]): boolean {
    if (differenceWith(grid1, grid2, isEqual).length === 0) {
      return false;
    }
    return true;
  }

  public blankGrid(n: number, m: number): number[][] {
    // returns a new grid
    let newGrid: number[][] = [];
    for (var i = 0; i < n; i++) {
      newGrid.push(new Array(m).fill(0));
    }
    return newGrid;
  }

  public flipGrid(grid: number[][]): number[][] {
    // returns a new grid
    let newGrid = cloneDeep(this.grid);
    for (let i = 0; i < newGrid.length; i++) {
      newGrid[i].reverse();
    }
    return newGrid;
  }

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

  public isGameWon(): boolean {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] >= 2048) {
          return true;
        }
      }
    }
    return false;
  }

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

  public slide(keyCode: string) {
    let flipped = false;
    let rotated = false;
    let played = true;
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
