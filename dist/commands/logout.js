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
const chalk_1 = require("chalk");
const fs = require("fs");
const request = require("request-promise-native");
function default_1(program, cacheFileName, session, PAPEP) {
    program
        .command('logout')
        .alias('lo')
        .description('Removes all local data.')
        .action(function handler() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!session)
                return console.log('You are not logged in.');
            console.log(`Invalidating token...`);
            try {
                let response = yield request({
                    method: 'get',
                    json: true,
                    uri: `${PAPEP}/api/v1/logout`,
                    headers: {
                        'cookie': `x-app-session=${session.token}`,
                        'x-app-csrf': session.csrfToken
                    }
                });
                if (response != 'ok')
                    throw new Error('Token invalid.');
                console.log(chalk_1.default.green('Success!'));
            }
            catch (e) {
                console.log(chalk_1.default.yellow('Failed to invalidate token. Maybe it was already invalid.'));
            }
            console.log(`Deleting all local data...`);
            fs.unlinkSync(cacheFileName);
            console.log(chalk_1.default.green('Success!'));
        });
    });
}
exports.default = default_1;
