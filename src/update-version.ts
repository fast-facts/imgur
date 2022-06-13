import { readFileSync } from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cmd = require('node-run-cmd');

const packageJson = JSON.parse(readFileSync('./node_modules/imgur/package.json').toString());
const version = (packageJson.version as string).replace('^', '');

console.log(`Imgur version ${version}`);

cmd.run(`sed -i s/0.0.0/${version}/g dist/package.json`, { shell: true });