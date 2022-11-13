import fs from "fs";
import crypto from 'crypto';


export function getFileSha256(filename: string){
  const fileBuffer = fs.readFileSync(filename);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);

  return hashSum.digest('hex');
}


export function checkCommandResult(result: string, expectation: string) {
  return (
    result.replace('\r', '') === expectation ||
    result.replace('\r', '') === expectation + "\n"
  );
}