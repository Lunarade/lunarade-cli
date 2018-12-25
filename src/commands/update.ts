import * as commander from 'commander';
import { execSync } from 'child_process';

export default function (program: commander.Command, configFileName: string, configFile: any) {
    program
        .command('update')
        .alias('u')
        .description('Updates the lunarade-platform package to the latest version.')
        .action(async function handler() {
            let cwd = __dirname + '/../..';
            execSync(`npm i @lunarade/platform@latest`, { stdio: 'inherit', cwd });
        });
}



