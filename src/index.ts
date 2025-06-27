#!/usr/bin/env node
import { exit } from "process";
import chalk from "chalk";
import fs from "fs";
import { program } from "commander";
import figlet from 'figlet';
import { fileURLToPath } from 'url';
import path from 'path';
import updateNotifier from 'update-notifier';
import base64ImageMime from 'base64-image-mime';
import getStdin from "get-stdin";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// get the app version
const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());


// define program parameters & options
interface ProgramOptions{
  encode: boolean | string,
  decode: boolean | string,
  inputFile: string,
  outputFile: string,
  version: boolean,
  jwt: string,
  html: boolean,
  updateNotification: boolean,
} 

program
  .option('-d, --decode [data]', 'set mode to encoding')
  .option('-e, --encode [data]', 'set mode to decoding')
  .option('-i, --input-file <filename>', 'read input from a file')
  .option('-o, --output-file <filename>', 'write output to a file')
  .option('-v, --version', 'display the version of this CLI')
  .option('--jwt <data>', 'display the content of a jwt token')
  .option('--html', 'encode an image into an html tag containing base64 data')
  .option('--no-update-notification', 'do not display update notifications')
  .addHelpText("before", chalk.red(figlet.textSync("b64", {font: 'Univers'})))
  .addHelpText("before", chalk.green("base64-advanced-cli v" + packageJson.version))
program.parse();

const options: ProgramOptions = program.opts();


try {
  if(options.encode === true && !options.inputFile){
    options.encode = await getStdin();
  }
  if(options.decode === true && !options.inputFile){
    options.decode = await getStdin();
  }

  //handle update notifications
  if( options.updateNotification ) {
  const updateCheckInterval = 1000 * 60 * 60 * 24 // 1 DAY
  const notifier = updateNotifier({pkg: packageJson, updateCheckInterval});
  if(options.version){
    try {
      //notifier.update = await notifier.fetchInfo();
    } catch (e) {
      console.log('Update check failed. Check your internet connection.')
    }
  }
  notifier.notify();
}


// if not arguments, we display help & exit the program
if (!process.argv.slice(2).length) {
  program.outputHelp();
  exit();
}

// display version handling
if(options.version) {
  console.log(chalk.green("base64-advanced-cli v" + packageJson.version));
  exit();
}

////////////////////
// error handling
////////////////////
if(options.encode && options.decode){
  throw new Error('Encode and Decode flags can\'t be used at the same time.');
}
if(!options.encode && !options.decode && !options.jwt && !options.version){
  throw new Error('No action to perform.');
}
if(options.inputFile && options.encode && options.encode !== true){
  throw new Error('Encode data and input-file can\'t be both provided at the same time.');
}
if(options.inputFile && options.decode && options.decode !== true){
  throw new Error('Decode data and input-file can\'t be both provided at the same time');
}
if(options.html && options.decode){
  throw new Error('Html image decoding is not supported');
}
if(options.html && !options.inputFile){
  throw new Error('No file to encode was provided');
}


// jwt handling
if(options.jwt) {
  const jwtParts = options.jwt.split('.');
  if(jwtParts.length === 3){
    console.log(chalk.blue('Header :', JSON.stringify(JSON.parse(Buffer.from(jwtParts[0], 'base64').toString("utf8")), null, 4)));
    console.log(chalk.green('Body :', JSON.stringify(JSON.parse(Buffer.from(jwtParts[1], 'base64').toString("utf8")), null, 4)));
  } else {
    console.log(chalk.red('invalid JWT token'));
  }
  exit();
}

// html images handling
if(options.html) {
  const imageContentB64 = fs.readFileSync(options.inputFile).toString('base64');
  const mimeType = base64ImageMime.getImageMime(imageContentB64);
  const imageHtml= `<img src="data:${mimeType};base64,${imageContentB64}" />`;
  if(options.outputFile){
    // create recursive directories for output
    fs.mkdirSync(path.dirname(options.outputFile), {recursive:true});
    
    fs.writeFileSync(options.outputFile, imageHtml);
  } else {
    console.log(chalk.yellow(imageHtml));
  }
  exit();
}

//handle stdin
// if(options.encode === true && process.stdin)






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

  // create recursive directories for output
  fs.mkdirSync(path.dirname(options.outputFile), {recursive:true});
  
  if(options.decode){
    fs.writeFileSync(options.outputFile, Buffer.from(inputAsB64string,'base64' ));
  } else {
    fs.writeFileSync(options.outputFile, outputBuffer);
  }
} else {
  console.log(chalk.yellow(outputBuffer.toString()));
}

} catch(e) {
  console.error(chalk.red(e));
  exit(1);
}