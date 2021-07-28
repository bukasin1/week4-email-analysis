import fs from 'fs';
import dns from 'dns';
import { exec, ExecException } from 'child_process';
import validator from 'email-validator';
import { validate } from 'email-domain-validator';
import * as dev from 'deep-email-validator';
// eslint-disable-next-line node/no-unsupported-features/node-builtins
import { promises as dns1 } from 'dns';

/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */

async function validateEmailAddresses(inputPath: string[], outputFile: string) {
  // const data = fs.readFileSync(inputPath[0], 'utf-8');
  const inputStream = fs.createReadStream(inputPath[0], 'utf8');
  const outputStream = fs.createWriteStream(outputFile);
  interface statusObj {
    [key: string]: boolean;
  }
  const domainsStatus: statusObj = {};
  const validEmails = [];
  outputStream.write('Email \n');
  inputStream.on('data', async (data) => {
    const emails = data.trim().split('\n') as Array<string>;
    console.log(`${emails.length} emails taken in to be validated`);
    try {
      let i = 0;
      for (const email of emails) {
        if (validator.validate(email)) {
          const domainName = email.split('@')[1];
          if (
            domainsStatus[domainName] ||
            domainsStatus[domainName] === false
          ) {
            // console.log('email is valid');
            validEmails.push(email);
            if (domainsStatus[domainName]) outputStream.write(email + '\n');
            console.log(`${validEmails.length} validEmails found`);
            continue;
          }
          // const execPromise: string | ExecException = await new Promise(
          //   (resolve, reject) => {
          //     exec(
          //       `dig MX ${domainName} +short +all`,
          //       (err, stdout, stderr) => {
          //         if (err) resolve(err);
          //         resolve(stdout);
          //       },
          //     );
          //   },
          // );
          // // console.log(execPromise);
          // if (typeof execPromise === 'string') {
          //   if (execPromise.length > 0) {
          //     outputStream.write(email + '\n');
          //     domainsStatus[domainName] = true;
          //   }
          // }
          const resolveObj = await dns1
            .resolveMx(domainName)
            .then((data) => {
              return true;
            })
            .catch((err) => {
              if (err.code === 'ENODATA') return false;
            });
          if (resolveObj) {
            outputStream.write(email + '\n');
            validEmails.push(email);
            domainsStatus[domainName] = resolveObj;
          }
          if (resolveObj === false) domainsStatus[domainName] = resolveObj;
          i++;
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
  inputStream.on('close', () => {
    console.log('Completed');
  });
}

// validateEmailAddresses(['fixtures/inputs/small-sample.csv'], 'test.csv');

export default validateEmailAddresses;
