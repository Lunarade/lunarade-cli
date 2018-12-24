import * as commander from 'commander';
import * as fs from 'fs';

export default function (program: commander.Command, configFileName: string, configFile: any) {
    program
        .command('config <key> [value]')
        .alias('c')
        .description('Get or set a configuration variable.')
        .action(async function handler(key, value, cmd) {
            if (!value)
                return console.log(configFile[key]);

            (function r(obj: any, curKey: string, rest: string) {
                if (!obj[curKey])
                    obj[curKey] = {};
                if (curKey == rest)
                    obj[curKey] = value;
                else
                    r(obj[curKey], rest.split('.').shift(), rest.replace(/^[^\.]+\./, ''));
            })(configFile, key.split('.').shift(), key.replace(/^[^\.]+\./, ''));

            fs.writeFileSync(configFileName, JSON.stringify(configFile));
        });
}



