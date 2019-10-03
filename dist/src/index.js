"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = __importStar(require("./Board"));
var tty = __importStar(require("tty"));
var keypress_1 = __importDefault(require("keypress"));
var clear_1 = __importDefault(require("clear"));
var Inquire_1 = __importDefault(require("./Inquire"));
var chalk_1 = __importDefault(require("chalk"));
var figlet_1 = __importDefault(require("figlet"));
// interface BoardDetails {
//   boardSize: number;
//   multiple: number;
// }
var renderTitle = function () {
    console.log(chalk_1.default.yellow(figlet_1.default.textSync("2048", { horizontalLayout: "full" })));
};
var runQuery = function () { return __awaiter(void 0, void 0, void 0, function () {
    var boardDetails;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                clear_1.default();
                renderTitle();
                return [4 /*yield*/, Inquire_1.default()];
            case 1:
                boardDetails = _a.sent();
                runGame(boardDetails);
                return [2 /*return*/];
        }
    });
}); };
var runGame = function (boardDetails) {
    var board = new Board_1.default(boardDetails.boardSize, boardDetails.multiple);
    var endGame = false;
    board.addNumber();
    board.addNumber();
    clear_1.default();
    renderTitle();
    board.renderBoard();
    board.renderInfoPanel(endGame);
    if (process.stdin instanceof tty.ReadStream) {
        // make `process.stdin` begin emitting "keypress" events
        keypress_1.default(process.stdin);
        // listen for the "keypress" event
        process.stdin.on("keypress", function (ch, key) {
            if (key && !endGame) {
                switch (key.name) {
                    case "right":
                    case "d":
                        board.slide(Board_1.SlideDirection.Right);
                        break;
                    case "left":
                    case "a":
                        board.slide(Board_1.SlideDirection.Left);
                        break;
                    case "up":
                    case "w":
                        board.slide(Board_1.SlideDirection.Up);
                        break;
                    case "down":
                    case "s":
                        board.slide(Board_1.SlideDirection.Down);
                        break;
                }
                clear_1.default();
                renderTitle();
                board.renderBoard();
                board.renderInfoPanel(endGame);
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
};
runQuery();
//# sourceMappingURL=index.js.map