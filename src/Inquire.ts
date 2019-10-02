import inquirer from "inquirer";

export default function askGameConfig() {
  const questions = [
    {
      name: "boardSize",
      type: "number",
      message:
        "Enter the size of the board you want to play with (3 -> 10) default (4): ",
      default: 4,
      validate: function(value: number) {
        if (value >= 3 && value <= 10) {
          return true;
        } else {
          return "Please enter of the board in range of 3 -> 10: ";
        }
      }
    },
    {
      name: "multiple",
      type: "number",
      message:
        "Enter the multiples you want to play with (2 -> 10) default (2): ",
      default: 2,
      validate: function(value: number) {
        if (value >= 2 && value <= 10) {
          return true;
        } else {
          return "Please enter the multiple in range of 2 -> 10: ";
        }
      }
    }
  ];
  return inquirer.prompt(questions);
}
