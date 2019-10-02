"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = __importDefault(require("./src/Board"));
var tty = __importStar(require("tty"));
var keypress_1 = __importDefault(require("keypress"));
var clear_1 = __importDefault(require("clear"));
var chalk_1 = __importDefault(require("chalk"));
var board = new Board_1.default(3);
board.renderBoard();
board.addNumber();
board.addNumber();
board.renderBoard();
var endGame = false;
if (process.stdin instanceof tty.ReadStream) {
    // make `process.stdin` begin emitting "keypress" events
    keypress_1.default(process.stdin);
    // listen for the "keypress" event
    process.stdin.on("keypress", function (ch, key) {
        if (key && !endGame) {
            switch (key.name) {
                case "left":
                case "right":
                case "up":
                case "down":
                    board.slide(key.name);
                    board.renderBoard();
                    console.log("TOTAL SCORE: " + board.score);
                    if (board.isGameOver()) {
                        console.log("NO MORE MOVES :( - " + chalk_1.default.bgRed.white("GAME OVER"));
                        endGame = true;
                    }
                    if (board.isGameWon()) {
                        console.log(chalk_1.default.bgYellow.black("CONGRATULATIONS") + " - YOU REACHED " + chalk_1.default.bgYellow.black("2048"));
                        console.log("YOU CAN CONTINUE TO PLAY THE GAME.");
                    }
                    break;
            }
        }
        if (key && key.ctrl && key.name == "c") {
            console.log("EXIT");
            clear_1.default();
            process.stdin.pause();
        }
    });
    process.stdin.setRawMode(true);
    process.stdin.resume();
}
//# sourceMappingURL=index.js.map