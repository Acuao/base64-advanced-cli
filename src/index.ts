#!/usr/bin/env node
import { exit } from "process";
import chalk from "chalk";
import fs from "fs";

console.log(chalk.red("Hello world!"));

// gestion des paramètres manquants
if (!process.argv[2] || !process.argv[3]) {
  console.log("Usage:");
  console.log("$ b64 [outputFileName] [base64EncodedData]");
  exit();
}

const fileName = process.argv[2];
const base64Data = process.argv[3];

// function to create file from base64 encoded string
function base64ToFile(base64str: string, file: string) {
  // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
  var buffer = Buffer.from(base64str, "base64");
  // write buffer to file
  fs.writeFileSync(file, buffer);
}

base64ToFile(base64Data, fileName);
