#!/usr/bin/env node
import { exit } from "process";

var fs = require('fs');


// gestion des paramètres manquants
if(!process.argv[2] || !process.argv[3]){
    console.error('Usage: ts-node base64ToFile.ts [outputFile.name] [b64Data]');
    exit();
}

const fileName = process.argv[2];
const base64Data= process.argv[3];




// function to create file from base64 encoded string
function base64ToFile(base64str: string, file: string) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var buffer = Buffer.from(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, buffer);
}



base64ToFile(base64Data, fileName);