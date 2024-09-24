import * as execa from 'execa';
import { readFileSync } from 'fs';

void (async () => {
  const packageJson = JSON.parse(readFileSync('./node_modules/imgur/package.json').toString());
  const version = (packageJson.version as string).replace('^', '');

  console.log(`Imgur version ${version}`);

  await execa(`sed -i s/0.0.0/${version}/g dist/package.json`, { shell: true });
})();
