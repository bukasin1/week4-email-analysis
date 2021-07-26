/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */

// const fs = require('fs')
import fs from 'fs';
import { exec } from 'child_process';
// import email_validator from 'email-validator';
// import { validate } from 'email-domain-validator';

// console.log(await validate('bukasin@gmail.com'));

async function analyseFiles(inputPaths: string[], outputPath: string) {
  // console.log('Complete the implementation in src/analysis.ts');

  //Create a read file promise.
  // const readFile = new Promise((resolve, reject) => {
  //   fs.readFile(inputPaths[0], 'utf-8', (err, data) => {
  //     if (err) reject(err);
  //     resolve(data);
  //   });
  // });
  // readFile
  //   .then(async (data: any) => {
  //     const execPro: string = await new Promise((resolve, reject) => {
  //       exec('dig MX decagon.com.ng +short +all', (err, stdout, stderr) => {
  //         if (err) reject(err);
  //         resolve(stdout);
  //       });
  //     });
  //     //Regex pattern to check for a validly formed email.
  //     // const testRegex = /^[A-Za-z]\w+@\w+\.\w+/;
  //     const emailRegex = /\w+@\w+\.\w+/;
  //     // console.log(emailRegex.test('b+uk@gh.com'));
  //     // console.log('hhhdj'.match(emailRegex));
  //     const validEmails = data
  //       .split('\n')
  //       .filter((email: string) => email.match(emailRegex));
  //     const validDomains: any = {};
  //     for (const email of validEmails) {
  //       const domain = email.split('@')[1];
  //       if (validDomains[domain]) {
  //         validDomains[domain] += 1;
  //       } else {
  //         validDomains[domain] = 1;
  //       }
  //     }
  //     const outPutData = {
  //       'valid-domains': Object.keys(validDomains),
  //       totalEmailsParsed: data.trim().split('\n').slice(1).length,
  //       totalValidEmails: validEmails.length,
  //       categories: validDomains,
  //     };
  //     fs.writeFile(
  //       outputPath,
  //       JSON.stringify(outPutData, null, 4),
  //       'utf-8',
  //       (err) => {
  //         if (err) {
  //           console.log('error occurred');
  //         }
  //       },
  //     );
  //   })
  //   .catch((err) => console.log(err));

  //------READING AND WRITING SYNCHRONOUSLY------
  const data = fs.readFileSync(inputPaths[0], 'utf-8');
  const emailRegex = /\w+@\w+\.\w+/;
  const validEmails = data
    .split('\n')
    .filter((email: string) => email.match(emailRegex));
  interface domain {
    [key: string]: number;
  }
  const validDomains: domain = {};
  for (const email of validEmails) {
    const domain = email.split('@')[1];
    if (validDomains[domain]) {
      validDomains[domain] += 1;
    } else {
      validDomains[domain] = 1;
    }
  }
  const outPutData = {
    'valid-domains': Object.keys(validDomains),
    totalEmailsParsed: data.trim().split('\n').slice(1).length,
    totalValidEmails: validEmails.length,
    categories: validDomains,
  };
  fs.writeFileSync(outputPath, JSON.stringify(outPutData, null, 4));

  // ----------CALL BACK HELL APPROACH.-----------
  // fs.readFile(inputPaths[0], 'utf-8', (err, data) => {
  //   if(err){
  //     console.log(err)
  //   }
  //   if(data){
  //     let emailRegex = /^[A-Za-z]\w+@\w+\.\w+/
  //     let validEmails = data.split('\n').filter(email => email.match(emailRegex))
  //     let validDomains:any = {}
  //     for(let email of validEmails){
  //       let domain = email.split('@')[1]
  //       if(validDomains[domain]){
  //         validDomains[domain] += 1
  //       }else{
  //         validDomains[domain] = 1
  //       }
  //     }
  //     validDomains
  //     let outPutData = {
  //       "valid-domains": Object.keys(validDomains),
  //       "totalEmailsParsed": data.trim().split('\n').slice(1).length,
  //       "totalValidEmails": validEmails.length,
  //       "categories": validDomains
  //     }
  //     fs.writeFile(outputPath, JSON.stringify(outPutData, null, 4), 'utf-8', (err) => {
  //       if(err){
  //         console.log('error occurred')
  //       }
  //     })
  //   }
  // })
}

// analyseFiles(['fixtures/inputs/small-sample.csv'], 'test.csv');

export default analyseFiles;
