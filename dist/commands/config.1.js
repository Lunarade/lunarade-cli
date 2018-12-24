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
const fs = require("fs");
function default_1(program, configFileName, configFile) {
    program
        .command('config <key> [value]')
        .alias('c')
        .description('Get or set a configuration variable.')
        .action(function handler(key, value, cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!value)
                return console.log(configFile[key]);
            configFile[key] = value;
            fs.writeFileSync(configFileName, JSON.stringify(configFile));
        });
    });
}
exports.default = default_1;
