/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */

// const fs = require('fs')
import fs from 'fs';
import { exec } from 'child_process';
import validator from 'email-validator';

// console.log(await validate('bukasin@gmail.com'));

async function analyseFiles(inputPaths: string[], outputPath: string) {
  //------READING AND WRITING SYNCHRONOUSLY------
  // const data = fs.readFileSync(inputPaths[0], 'utf-8');
  const inputStream = fs.createReadStream(inputPaths[0], 'utf8');
  const outputStream = fs.createWriteStream(outputPath);
  let data = '';
  const stream = fs.createReadStream(inputPaths[0]);
  for await (const chunk of stream as fs.ReadStream) {
    data += chunk;
  }
  interface domain {
    [key: string]: number;
  }
  // console.log('buka@ds.fd'.match(emailRegex));
  const validDomains: domain = {};
  let validEmails = 0;
  inputStream.on('data', (data) => {
    const emailRegex = /\w+@\w+\.\w+/;
    const validChunkEmails = data
      .split('\n')
      .filter((email: string) => validator.validate(email));
    // console.log(validEmails);
    for (const email of validChunkEmails) {
      const domain = email.split('@')[1];
      if (validDomains[domain]) {
        validDomains[domain] += 1;
      } else {
        validDomains[domain] = 1;
      }
    }
    validEmails += validChunkEmails.length;
  });

  inputStream.on('close', () => {
    const outPutData = {
      'valid-domains': Object.keys(validDomains),
      totalEmailsParsed: data.trim().split('\n').slice(1).length,
      totalValidEmails: validEmails,
      categories: validDomains,
    };
    // fs.writeFileSync(outputPath, JSON.stringify(outPutData, null, 4));
    outputStream.write(JSON.stringify(outPutData, null, 4));
  });
}

// analyseFiles(['fixtures/inputs/small-sample.csv'], 'test.csv');

export default analyseFiles;
