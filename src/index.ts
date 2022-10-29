#!/usr/bin/env node
import { exit } from "process";
import chalk from "chalk";
import fs from "fs";
import { program } from "commander";
import figlet from 'figlet';

import { fileURLToPath } from 'url';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// get the app version
const packageJsonPath = path.resolve(__dirname, '../../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());

// define program parameters & options
interface ProgramOptions{
  encode: boolean | string,
  decode: boolean | string,
  inputFile: string,
  outputFile: string,
  version: boolean,
  jwt: string,
} 

program
  .option('-d, --decode [data]', 'set mode to encoding')
  .option('-e, --encode [data]', 'set mode to decoding')
  .option('-i, --input-file <filename>', 'read input from a file')
  .option('-o, --output-file <filename>', 'write output to a file')
  .option('-v, --version', 'display the version of this CLI')
  .option('--jwt <data>', 'display the content of a jwt token')
  .addHelpText("before", chalk.red(figlet.textSync("b64", {font: 'Univers'})))
  .addHelpText("before", chalk.green("base64-advanced-client v" + packageJson.version))
program.parse();

const options: ProgramOptions = program.opts();



// if not arguments, we display help & exit the program
if (!process.argv.slice(2).length) {
  program.outputHelp();
  exit();
}

// display version handling
if(options.version) {
  console.log(chalk.green("base64-advanced-client v" + packageJson.version));
}

////////////////////
// error handlings
if(options.encode && options.decode){
  console.log(chalk.red('Encode and Decode flags can\'t be used at the same time.'));
  exit();
}
if(options.inputFile && options.encode && options.encode !== true){
  console.log(chalk.red('Encode data and input-file can\'t be both provided at the same time.'));
  exit();
}
if(options.inputFile && options.decode && options.decode !== true){
  console.log(chalk.red('Decode data and input-file can\'t be both provided at the same time'));
  exit();
}

let inputEncoding: BufferEncoding = 'base64';
let inputAsB64string = '';


// jwt handling
if(options.jwt) {
  const jwtParts = options.jwt.split('.');
  if(jwtParts.length === 3){
    console.log(chalk.blue('Header :', JSON.stringify(JSON.parse(atob(jwtParts[0])), null, 4)));
    console.log(chalk.green('Body :', JSON.stringify(JSON.parse(atob(jwtParts[1])), null, 4)));
  } else {
    console.log(chalk.red('invalid JWT token'));
  }
  exit();
}


// we convert all inputs as base 64 to have common encoding, useful for exotic file conversions
// handle "encode" input
if(options.encode){
  inputEncoding = 'utf8';
  if(options.encode !== true){
    inputAsB64string = Buffer.from(options.encode, inputEncoding).toString('base64');
  } else if(options.inputFile) {
    inputAsB64string = fs.readFileSync(options.inputFile).toString('base64');
  }
}

//handle "decode" input
if(options.decode){
  inputEncoding = 'base64';
  if(options.decode !== true){
    inputAsB64string = options.decode;
  } else if(options.inputFile) {
    inputAsB64string = fs.readFileSync(options.inputFile).toString('ascii');
  }
}




// handle output
const outputBuffer = Buffer.from(inputAsB64string, inputEncoding);
if(options.outputFile){
  console.log('inputEncoding', inputEncoding);
  if(options.decode){
    // fs.writeFileSync(options.outputFile, outputBuffer.toString()) // OK mais pas pour les images
    fs.writeFileSync(options.outputFile, Buffer.from(inputAsB64string,'base64' ));
  } else {
    fs.writeFileSync(options.outputFile, outputBuffer)
  }
} else {
  console.log(chalk.yellow(outputBuffer.toString()));
}
