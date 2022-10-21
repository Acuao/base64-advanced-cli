#!/usr/bin/env node
import { exit } from "process";
import chalk from "chalk";
import fs from "fs";
import { program } from "commander";
import figlet from 'figlet';


// display command header

// define program parameters & options
program
.option('-d, --decode [data]', 'set mode to encoding')
.option('-e, --encode [data]', 'set mode to decoding')
.option('-i, --input-file <filename>', 'read input from a file')
.option('-o, --output-file <filename>', 'write output to a file')
program.parse();

const options = program.opts();



// if not arguments, we display help & exit the program
if (!process.argv.slice(2).length) {
  console.log(chalk.red(figlet.textSync("b64")));
  console.log(chalk.green("base64-advanced-client"));
  program.outputHelp();
  exit();
}


// error handling
if(options.encode && options.decode){
  console.log(chalk.red('Encode & Decode flags can\'t be used at the same time.'));
  exit();
}

let inputEncoding: BufferEncoding;
let outputEncoding: BufferEncoding = 'utf8' as BufferEncoding;
let inputBuffer: Buffer = Buffer.from('');

// handle "encode" input
if(options.encode){
  inputEncoding = 'utf8';
  outputEncoding = 'base64'
  if(options.encode !== true){
    inputBuffer = Buffer.from(options.encode, inputEncoding);
  } else if(options.inputFile) {
    inputBuffer = fs.readFileSync(options.inputFile);
  }
}

//handle "decode" input
if(options.decode){
  inputEncoding = 'base64';
  outputEncoding = 'utf8'
  if(options.decode !== true){
    inputBuffer = Buffer.from(options.decode, inputEncoding)
  } else if(options.inputFile) {
    inputBuffer = fs.readFileSync(options.inputFile);
  }
}

// handle output
if(options.outputFile){
  fs.writeFileSync(options.outputFile, inputBuffer);
} else {
  console.log(chalk.yellow(inputBuffer.toString(outputEncoding)));
}