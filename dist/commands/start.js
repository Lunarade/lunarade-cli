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
const fs_1 = require("fs");
function default_1(program, configFileName, configFile) {
    program
        .command('start')
        .alias('s')
        .option('-m, --module <module>', 'Modules to install and include.', (val, array) => { array.push(val); return array; }, [])
        .option('-d, --daemon', 'Start as daemon.')
        .description('Start the Lunarade platform based on saved configuration.')
        .action(function handler(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let cmd = args.pop();
            let modules = cmd.module;
            let cwd = __dirname + '/../../node_modules/@lunarade/platform';
            if (!fs_1.existsSync(cwd + '/node_modules/@lunarade')) {
                console.log('Preparing...');
                child_process_1.execSync('npm i', { stdio: 'inherit', cwd });
            }
            if (modules && modules.length) {
                child_process_1.execSync(`npm i ${modules.join(' ')}`, { stdio: 'inherit', cwd });
                child_process_1.execSync(`npm rebuild node-sass`, { stdio: 'inherit', cwd });
            }
            if (cmd.daemon)
                child_process_1.execSync('"../../../.bin/forever" start main.js', { stdio: 'inherit', cwd: cwd + '/dist' });
            else
                child_process_1.execSync('node main.js', { stdio: 'inherit', cwd: cwd + '/dist' });
        });
    });
}
exports.default = default_1;
