import Board, { SlideDirection } from "./Board";
import * as tty from "tty";
import keypress from "keypress";
import clear from "clear";
import askBoardQuestions from "./Inquire";
import chalk from "chalk";
import figlet from "figlet";

// interface BoardDetails {
//   boardSize: number;
//   multiple: number;
// }

const renderTitle = () => {
  console.log(
    chalk.yellow(figlet.textSync("2048", { horizontalLayout: "full" }))
  );
};

const runQuery = async () => {
  clear();
  renderTitle();
  let boardDetails = await askBoardQuestions();
  runGame(boardDetails);
};

const runGame = (boardDetails: any) => {
  let board = new Board(boardDetails.boardSize, boardDetails.multiple);
  let endGame = false;
  board.addNumber();
  board.addNumber();
  clear();
  renderTitle();
  board.renderBoard();
  board.renderInfoPanel(endGame);

  if (process.stdin instanceof tty.ReadStream) {
    // make `process.stdin` begin emitting "keypress" events
    keypress(process.stdin);
    // listen for the "keypress" event
    process.stdin.on("keypress", function(ch: any, key: any) {
      if (key && !endGame) {
        switch (key.name) {
          case "right":
          case "d":
            board.slide(SlideDirection.Right);
            break;
          case "left":
          case "a":
            board.slide(SlideDirection.Left);
            break;
          case "up":
          case "w":
            board.slide(SlideDirection.Up);
            break;
          case "down":
          case "s":
            board.slide(SlideDirection.Down);
            break;
        }
        clear();
        renderTitle();
        board.renderBoard();
        board.renderInfoPanel(endGame);
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
};

runQuery();
