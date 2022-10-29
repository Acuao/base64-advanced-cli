import { execSync } from "child_process";
import chalk from "chalk";
import fs from "fs";
import { getFileSha256 } from './test-utils.js';


let errorCount = 0;

console.log(chalk.blue('simple encoding', ':'));                                             
if(execSync('b64 -e test').toString('utf-8') === 'dGVzdA==\n'){
  console.log(chalk.green('TEST Success !'));                                             
} else {
  console.log(chalk.red('TEST Failed !'));
  errorCount ++;                                             
}




console.log(chalk.blue('simple decoding', ':'));                                             
if(execSync('b64 -d dGVzdA==').toString('utf-8') === 'test\n'){
  console.log(chalk.green('TEST Success !'));                                             
} else {
  console.log(chalk.red('TEST Failed !')); 
  errorCount ++;                                             
}



console.log(chalk.blue('JWT decoding', ':'));      
//OK//if(execSync('b64 --jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.hqWGSaFpvbrXkOWc6lrnffhNWR19W_S1YKFBx2arWBk').toString('base64') == 'SGVhZGVyIDogewogICAgImFsZyI6ICJIUzI1NiIsCiAgICAidHlwIjogIkpXVCIKfQpCb2R5IDogewogICAgIm5hbWUiOiAiSm9obiBEb2UiLAogICAgImlhdCI6IDE1MTYyMzkwMjIKfQo='){
if(execSync('b64 --jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.hqWGSaFpvbrXkOWc6lrnffhNWR19W_S1YKFBx2arWBk').toString('utf8') === fs.readFileSync('./test/jwt-output.txt').toString('utf8')){
  console.log(chalk.green('TEST Success !'));                                             
} else {
  console.log(chalk.red('TEST Failed !')); 
  errorCount ++;                                             
}




console.log(chalk.blue('base 64 from file to file', ':'));      
//OK//if(execSync('b64 --jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.hqWGSaFpvbrXkOWc6lrnffhNWR19W_S1YKFBx2arWBk').toString('base64') == 'SGVhZGVyIDogewogICAgImFsZyI6ICJIUzI1NiIsCiAgICAidHlwIjogIkpXVCIKfQpCb2R5IDogewogICAgIm5hbWUiOiAiSm9obiBEb2UiLAogICAgImlhdCI6IDE1MTYyMzkwMjIKfQo='){
execSync('b64 -d -i test/bus.gif.b64 -o test/bus.tmp.gif');

if( getFileSha256('test/bus.tmp.gif') ===  '396c7b535869e4418fd9d9657635e5134c6ba626819059f0b26e9b8fbc82a761'){
  console.log(chalk.green('TEST Success !'));                                             
} else {
  console.log(chalk.red('TEST Failed !')); 
  errorCount ++;                                             
}
fs.rmSync('test/bus.tmp.gif');




////////////////////////////////
/// CONCLUSION /////////////////
////////////////////////////////

if(errorCount > 0){
  console.log(chalk.bgRed('              \n TESTS FAILED \n              '));
  throw new Error( errorCount + ' test(s) failed');
} else {
  console.log(chalk.bgGreen('                \n TESTS SUCCEDED \n                '));
}

