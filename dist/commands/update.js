"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function default_1(program, configFileName, configFile) {
    program
        .command('update')
        .alias('u')
        .description('Updates the lunarade-platform package to the latest version.')
        .action(function handler() {
        return __awaiter(this, void 0, void 0, function* () {
            let cwd = __dirname + '/../..';
            child_process_1.execSync(`npm i @lunarade/platform@latest`, { stdio: 'inherit', cwd });
        });
    });
}
exports.default = default_1;
