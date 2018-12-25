"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _package = require('../package');
// For the love of God
Object.defineProperty(Object.prototype, 'getQuestion', {
    set() {
        // ...
    },
    get() {
        return function () {
            var message = chalk_1.default.bold(this.opt.message) + ' ';
            if (this.opt.default != null && this.status !== 'answered')
                message += chalk_1.default['dim']('(' + this.opt.default + ') ');
            return message;
        };
    }
});
const fs = require("fs");
const program = require("commander");
const chalk_1 = require("chalk");
const configFileName = `${process.env.USERPROFILE || process.env.HOME}/.lunarade-cli`;
var configFile = {};
try {
    configFile = JSON.parse(fs.readFileSync(configFileName).toString());
}
catch (e) { }
program.usage('<command> [options]');
program.version(_package.version);
require('./commands/config').default(program, configFileName, configFile);
require('./commands/start').default(program, configFileName, configFile);
require('./commands/update').default(program, configFileName, configFile);
program.parse(process.argv);
if (!process.argv[2])
    console.log(`🌚 Lunarade CLI v${_package.version}`);
