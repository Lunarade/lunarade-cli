const _package = require('../package');

// For the love of God
Object.defineProperty(Object.prototype, 'getQuestion', {
  set() {
    // ...
  },
  get() {
    return function () {
      var message = chalk.bold(this.opt.message) + ' ';
      if (this.opt.default != null && this.status !== 'answered')
        message += chalk['dim']('(' + this.opt.default + ') ');
      return message;
    }
  }
});

import * as fs from 'fs';
import * as program from 'commander';
import chalk from 'chalk';

const configFileName = `${process.env.USERPROFILE || process.env.HOME}/.lunarade-cli`;

var configFile = {};

try {
  configFile = JSON.parse(fs.readFileSync(configFileName).toString());
} catch (e) { }

program.usage('<command> [options]');

program.version(_package.version);

require('./commands/config').default(program, configFileName, configFile);
require('./commands/start').default(program, configFileName, configFile);
require('./commands/update').default(program, configFileName, configFile);

program.parse(process.argv);

if (!process.argv[2])
  console.log(`🌚 Lunarade CLI v${_package.version}`);
