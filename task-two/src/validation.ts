/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */

import fs from 'fs';
import { exec } from 'child_process';

async function validateEmailAddresses(inputPath: string[], outputFile: string) {
  // console.log('Complete the implementation in src/validation.ts');
  // let strOut = '';
  // const readFile = new Promise((resolve, reject) => {
  //   fs.readFile(inputPath[0], 'utf-8', (err, data) => {
  //     if (err) reject(err);
  //     resolve(data);
  //   });
  // });
  // strOut;
  // await readFile.then(async (data: any) => {
  //   strOut += 'Emails \n';
  //   try {
  //     for (const email of data.split('\n')) {
  //       // exec(
  //       //   `dig MX ${email.split('@')[1]} +short +all`,
  //       //   (err, stdout, stderr) => {
  //       //     if (err) console.log(err);
  //       //     console.log(stdout.length);
  //       //     if (stdout.length > 0) {
  //       //       strOut += email;
  //       //       strOut += '\n';
  //       //       arr.push(email);
  //       //       // arr;
  //       //       strOut;
  //       //     }
  //       //   },
  //       // );
  //       const execPro: string = await new Promise((resolve, reject) => {
  //         exec(
  //           `dig MX ${email.split('@')[1]} +short +all`,
  //           (err, stdout, stderr) => {
  //             if (err) reject(err);
  //             resolve(stdout);
  //           },
  //         );
  //       });
  //       if (execPro.length > 0) {
  //         strOut += email;
  //         strOut += '\n';
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   fs.writeFile(outputFile, strOut, 'utf-8', (err) => {
  //     if (err) {
  //       console.log('error occurred');
  //     }
  //   });
  // });

  //------READING AND WRITING SYNCHRONOUSLY------
  const data = fs.readFileSync(inputPath[0], 'utf-8');
  let strOutSync = 'Emails \n';
  try {
    for (const email of data.split('\n')) {
      const execPromise: string = await new Promise((resolve, reject) => {
        exec(
          `dig MX ${email.split('@')[1]} +short +all`,
          (err, stdout, stderr) => {
            if (err) reject(err);
            resolve(stdout);
          },
        );
      });
      if (execPromise.length > 0) {
        strOutSync += email;
        strOutSync += '\n';
      }
    }
  } catch (err) {
    console.log(err);
  }

  console.log(strOutSync);
  fs.writeFileSync(outputFile, strOutSync);
}

// validateEmailAddresses(['fixtures/inputs/small-sample.csv'], 'test.csv');

export default validateEmailAddresses;
