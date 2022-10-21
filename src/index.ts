#!/usr/bin/env node
import { exit } from "process";
import chalk from "chalk";
import fs from "fs";
import { program } from "commander";
import figlet from 'figlet';

// display command header

// define program parameters & options
interface ProgramOptions{
  encode: boolean | string,
  decode: boolean | string,
  inputFile: string,
  outputFile: string,
} 

program
.option('-d, --decode [data]', 'set mode to encoding')
.option('-e, --encode [data]', 'set mode to decoding')
.option('-i, --input-file <filename>', 'read input from a file')
.option('-o, --output-file <filename>', 'write output to a file')
.addHelpText("before", chalk.red(figlet.textSync("b64", {font: 'Univers'})))
.addHelpText("before", chalk.green("base64-advanced-client"))
program.parse();

const options: ProgramOptions = program.opts();



// if not arguments, we display help & exit the program
if (!process.argv.slice(2).length) {
  program.outputHelp();
  exit();
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

