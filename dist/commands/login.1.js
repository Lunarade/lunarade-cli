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
const inquirer = require("inquirer");
const chalk_1 = require("chalk");
const fs = require("fs");
const request = require("request-promise-native");
function default_1(program, cacheFileName, PAPEP) {
    program
        .command('login')
        .alias('l')
        .description('Log in with your PAP account.')
        .action(function handler(cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username, password } = yield inquirer.prompt([
                {
                    name: 'username',
                    message: 'Username:'
                },
                {
                    name: 'password',
                    type: 'password',
                    message: 'Password:'
                }
            ]);
            console.log(`Logging in as ${chalk_1.default.cyan(username)} ...`);
            try {
                var response = yield new Promise(r => request({
                    method: 'post',
                    json: true,
                    uri: `${PAPEP}/api/v1/login`,
                    body: {
                        email: username,
                        password: password
                    }
                }, (req, res) => {
                    r(Object.assign(res.body, { token: decodeURIComponent(res.headers['set-cookie'].filter(c => c.match(/x\-app\-session/))[0].match(/^x\-app\-session=([^;]+)/)[1]) }));
                }));
            }
            catch (e) {
                return console.log(chalk_1.default.red('Invalid credentials.'));
            }
            fs.writeFileSync(cacheFileName, JSON.stringify(response));
            console.log(chalk_1.default.green('Success!'));
        });
    });
}
exports.default = default_1;
