import { execSync } from "child_process";
import chalk from "chalk";
import fs from "fs";
import { getFileSha256, checkCommandResult } from './test-utils.js';


let errorCount = 0;





console.log(chalk.blue('simple encoding', ':'));                                             
if(checkCommandResult(
  execSync('b64 -e test').toString('utf-8'),
  'dGVzdA=='
)){
  console.log(chalk.green('TEST Success !'));                                             
} else {
  console.log(chalk.red('TEST Failed !'));
  errorCount ++;                                             
}




console.log(chalk.blue('simple decoding', ':'));                                             
if(checkCommandResult(
  execSync('b64 -d dGVzdA==').toString('utf-8'),
  'test'
)){
  console.log(chalk.green('TEST Success !'));                                             
} else {
  console.log(chalk.red('TEST Failed !')); 
  errorCount ++;                                             
}



console.log(chalk.blue('input file encoding', ':'));                                             
if(checkCommandResult(
  execSync('b64 -e -i test/in-love-small.png').toString('utf-8'),
  'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABq0lEQVQ4jWNgQAP/D/AE/d/PfQGIfwDxfyj+8X8f9/n/+3kC0NVDNDEwML7NNJH9v4/zyv+93P//bhP4j6QZjP9u5///fy8PkM116XWSldR/hnomqOZQ5jvaCbvvaCT/fxHl9v+xa9B/EPtNnjVc87tSs/93NJP/P3IM/f8y3hksf0cr8fgVrVA2hlsaKRZgATR8VzsRYuM+7v93dRMw5MFq1BJtGL5OU027o5mEIfnQNhzugod24ZgGAPV8maiRwgAKsNdZthgKvvSpww340q+OIf860w7kurNAA7h+/NvD+/9FrAvEWVqJ/z/UGmIEIkgM5C1wWMW4/gfpARrwHWTAP5iir5PU/v+YL4ehGYZ/LpEGuwYuto/7HwOIwKZYS9X/v5RUCBhrq/njMvQf2AvYJOVlg/6rSYeCsYJcEHYDwF4ApzBMyR5nz/+3gP69CcQ9Lh64XHCGAZQ8sUn+2MH/f3e8LRiD2FgN2MPrC0mNwOSJK+Dw4AuIvLCKgQdoyFuiNe8Dqj3DwIWaoSCGXCTGZgzNKAbt4/EHpTBQCEPSCBCD2dxn4H5GAgAOzEfknjgxDwAAAABJRU5ErkJggg=='
)){
  console.log(chalk.green('TEST Success !'));                                             
} else {
  console.log(chalk.red('TEST Failed !')); 
  errorCount ++;                                             
}




console.log(chalk.blue('input file decoding', ':'));   
if(checkCommandResult(
  execSync('b64 -d -i test/hello-world.txt.b64').toString('utf-8'),
  'Hello World!'
)){
  console.log(chalk.green('TEST Success !'));                                             
} else {
  console.log(chalk.red('TEST Failed !')); 
  errorCount ++;                                             
}                                          




console.log(chalk.blue('decode to file', ':'));      
execSync('b64 -d iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABq0lEQVQ4jWNgQAP/D/AE/d/PfQGIfwDxfyj+8X8f9/n/+3kC0NVDNDEwML7NNJH9v4/zyv+93P//bhP4j6QZjP9u5///fy8PkM116XWSldR/hnomqOZQ5jvaCbvvaCT/fxHl9v+xa9B/EPtNnjVc87tSs/93NJP/P3IM/f8y3hksf0cr8fgVrVA2hlsaKRZgATR8VzsRYuM+7v93dRMw5MFq1BJtGL5OU027o5mEIfnQNhzugod24ZgGAPV8maiRwgAKsNdZthgKvvSpww340q+OIf860w7kurNAA7h+/NvD+/9FrAvEWVqJ/z/UGmIEIkgM5C1wWMW4/gfpARrwHWTAP5iir5PU/v+YL4ehGYZ/LpEGuwYuto/7HwOIwKZYS9X/v5RUCBhrq/njMvQf2AvYJOVlg/6rSYeCsYJcEHYDwF4ApzBMyR5nz/+3gP69CcQ9Lh64XHCGAZQ8sUn+2MH/f3e8LRiD2FgN2MPrC0mNwOSJK+Dw4AuIvLCKgQdoyFuiNe8Dqj3DwIWaoSCGXCTGZgzNKAbt4/EHpTBQCEPSCBCD2dxn4H5GAgAOzEfknjgxDwAAAABJRU5ErkJggg== -o test/decodedImage.tmp.png');

if( getFileSha256('test/decodedImage.tmp.png') ===  '40590e28491ad53b9acdb71697ea2977336819f8e170ad95451728d94e2a4a12'){
  console.log(chalk.green('TEST Success !'));                                             
} else {
  console.log(chalk.red('TEST Failed !')); 
  errorCount ++;                                             
}
fs.rmSync('test/decodedImage.tmp.png');



console.log(chalk.blue('encode to file', ':'));                                             
execSync('b64 -e "Hello World" -o test/encoded.tmp.txt.b64');

if( getFileSha256('test/encoded.tmp.txt.b64') ===  'd9de98033e40166f4ba06a3d3b7fc34f7420242bbb9430a8584b2f3aaf8f9642'){
  console.log(chalk.green('TEST Success !'));                                             
} else {
  console.log(chalk.red('TEST Failed !')); 
  errorCount ++;                                             
}
fs.rmSync('test/encoded.tmp.txt.b64');



console.log(chalk.blue('JWT decoding', ':'));      
if(execSync('b64 --jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.hqWGSaFpvbrXkOWc6lrnffhNWR19W_S1YKFBx2arWBk').toString('utf8') === fs.readFileSync('./test/jwt-output.txt').toString('utf8')){
  console.log(chalk.green('TEST Success !'));                                             
} else {
  console.log(chalk.red('TEST Failed !')); 
  errorCount ++;                                             
}




console.log(chalk.blue('html image encoding', ':'));      
if(execSync('b64 -e --html -i test/in-love-small.png').toString('utf8') === fs.readFileSync('./test/html-image-output.html').toString('utf8')+'\n'){
  console.log(chalk.green('TEST Success !'));                                             
} else {
  console.log(chalk.red('TEST Failed !')); 
  errorCount ++;                                             
}




console.log(chalk.blue('html image encoding to file', ':'));      
execSync('b64 -e --html -i test/in-love-small.png -o test/image.tmp.html');

if(getFileSha256('./test/image.tmp.html') === getFileSha256('./test/html-image-output.html')){
  console.log(chalk.green('TEST Success !'));                                             
} else {
  console.log(chalk.red('TEST Failed !')); 
  errorCount ++;                                             
}
fs.rmSync('test/image.tmp.html');





console.log(chalk.blue('decode from file to file', ':'));      
execSync('b64 -d -i test/bus.gif.b64 -o test/decoded.tmp.gif');

if( getFileSha256('test/decoded.tmp.gif') ===  '396c7b535869e4418fd9d9657635e5134c6ba626819059f0b26e9b8fbc82a761'){
  console.log(chalk.green('TEST Success !'));                                             
} else {
  console.log(chalk.red('TEST Failed !')); 
  errorCount ++;                                             
}
fs.rmSync('test/decoded.tmp.gif');



console.log(chalk.blue('encode from file to file', ':'));      
execSync('b64 -e -i test/bus.gif -o test/encoded.tmp.gif');

if( getFileSha256('test/encoded.tmp.gif') ===  'ffe3bbb08cd54b7c14d491d1f82ec7b17d88b06c097ead6d76c67faf014835e8'){
  console.log(chalk.green('TEST Success !'));                                             
} else {
  console.log(chalk.red('TEST Failed !')); 
  errorCount ++;                                             
}
fs.rmSync('test/encoded.tmp.gif');












////////////////////////////////
/// CONCLUSION /////////////////
////////////////////////////////

if(errorCount > 0){
  console.log(chalk.bgRed('              \n TESTS FAILED \n              '));
  throw new Error( errorCount + ' test(s) failed');
} else {
  console.log(chalk.bgGreen('                \n TESTS SUCCEDED \n                '));
}

