import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// get the app version
const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());

function deepCopy(data: any): any {
  return JSON.parse(JSON.stringify(data));
}

// init packageDist (copy without reference)
const packageDist = deepCopy(packageJson);




////////////////////////
// edit package dist
delete packageDist.scripts;

packageDist.bin.b64 = packageDist.bin.b64.replace('/dist/', '/');





//////////////////////////
// write dist/package.json file
const packageDistPath = path.resolve(__dirname, '../dist/package.json');
fs.writeFileSync(packageDistPath, JSON.stringify(packageDist, undefined, 2));
