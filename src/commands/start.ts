import * as commander from 'commander';
import { execSync } from 'child_process';

export default function (program: commander.Command, configFileName: string, configFile: any) {
    program
        .command('start')
        .alias('s')
        .option('-m, --module <module>', 'Modules to install and include.', (val, array) => { array.push(val); return array; }, [])
        .option('-d, --daemon', 'Start as daemon.')
        .description('Start the Lunarade platform based on saved configuration.')
        .action(async function handler(...args) {
            let cmd = args.pop();
            let modules = cmd.module;
            let cwd = __dirname + '/../../node_modules/@lunarade/platform';

            if (modules && modules.length)
                execSync(`npm i ${modules.join(' ')}`, { stdio: 'inherit', cwd });

            if (cmd.daemon)
                execSync('"../../../.bin/forever" start main.js', { stdio: 'inherit', cwd: cwd + '/dist' });
            else
                execSync('node main.js', { stdio: 'inherit', cwd: cwd + '/dist' });
        });
}



