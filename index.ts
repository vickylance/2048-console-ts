import Board from "./src/Board";
import * as tty from "tty";
import keypress from "keypress";
import clear from "clear";

let board = new Board(3);
board.renderBoard();
board.addNumber();
board.addNumber();
board.renderBoard();

let endGame = false;
board.renderInfoPanel(endGame);

if (process.stdin instanceof tty.ReadStream) {
  // make `process.stdin` begin emitting "keypress" events
  keypress(process.stdin);
  // listen for the "keypress" event
  process.stdin.on("keypress", function(ch: any, key: any) {
    if (key && !endGame) {
      switch (key.name) {
        case "left":
        case "right":
        case "up":
        case "down":
          board.slide(key.name);
          board.renderBoard();
          board.renderInfoPanel(endGame);
          break;
      }
    }
    if (key && key.ctrl && key.name == "c") {
      console.log("EXIT");
      clear();
      process.stdin.pause();
    }
  });
  process.stdin.setRawMode(true);
  process.stdin.resume();
}
