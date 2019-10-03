"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = __importDefault(require("inquirer"));
function askGameConfig() {
    var questions = [
        {
            name: "boardSize",
            type: "number",
            message: "Enter the size of the board you want to play with (3 -> 10) default (4): ",
            default: 4,
            validate: function (value) {
                if (value >= 3 && value <= 10) {
                    return true;
                }
                else {
                    return "Please enter of the board in range of 3 -> 10: ";
                }
            }
        },
        {
            name: "multiple",
            type: "number",
            message: "Enter the multiples you want to play with (2 -> 10) default (2): ",
            default: 2,
            validate: function (value) {
                if (value >= 2 && value <= 10) {
                    return true;
                }
                else {
                    return "Please enter the multiple in range of 2 -> 10: ";
                }
            }
        }
    ];
    return inquirer_1.default.prompt(questions);
}
exports.default = askGameConfig;
//# sourceMappingURL=Inquire.js.map