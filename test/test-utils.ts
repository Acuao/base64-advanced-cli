import fs from "fs";
import crypto from 'crypto';


export function getFileSha256(filename: string){
  const fileBuffer = fs.readFileSync(filename);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);

  return hashSum.digest('hex');
}