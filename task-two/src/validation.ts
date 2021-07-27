import fs from 'fs';
import dns from 'dns';
import { exec, ExecException } from 'child_process';
import validator from 'email-validator';
import { validate } from 'email-domain-validator';
import * as dev from 'deep-email-validator';
import console from 'console';

/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */

// async function validateEmailAddresses(inputPath: string[], outputFile: string) {
//   //------READING AND WRITING SYNCHRONOUSLY------
//   const data = fs.readFileSync(inputPath[0], 'utf-8');

//   let strOutSync = 'Emails \n';
//   const execPromiseArray: Promise<string>[] = [];
//   try {
//     console.log('copying...');
//     let i = 0;
//     for (const email of data.split('\n')) {
//       const execPromise: string | ExecException = await new Promise(
//         (resolve, reject) => {
//           exec(
//             `dig MX ${email.split('@')[1]} +short +all`,
//             (err, stdout, stderr) => {
//               if (err) resolve(err);
//               resolve(stdout);
//             },
//           );
//         },
//       );
//       i++;
//       // console.log(execPromise);
//       if (typeof execPromise === 'string') {
//         if (execPromise.length > 0) {
//           strOutSync += email;
//           strOutSync += '\n';
//         }
//       }
//       fs.writeFileSync(outputFile, strOutSync);
//       // execPromiseArray.push(execPromise);
//     }
//     // const execStatus: Array<string> = await Promise.all(execPromiseArray);
//     // let j = 0;
//     // for (const email of data.split('\n')) {
//     //   if (execStatus[j].length > 0) {
//     //     strOutSync += email;
//     //     strOutSync += '\n';
//     //   }
//     //   j++;
//     // }
//   } catch (err) {
//     console.log(err);
//   }
//   // fs.writeFileSync(outputFile, strOutSync);
//   console.log('Completed');
// }

async function validateEmailAddresses(inputPath: string[], outputFile: string) {
  //
  const data = fs.readFileSync(inputPath[0], 'utf-8');
  const emails = data.trim().split('\n').slice(1);
  console.log(`${emails.length} emails taken in to be validated`);
  //Pick out the unique domains
  const uniqueDomains = [
    ...new Set(emails.map((email) => email.split('@')[1])),
  ];
  console.log(`${uniqueDomains.length} unique domain names`);
  //Filter out domains that are invalidly formed
  const validDomains = uniqueDomains.filter((dom) =>
    validator.validate(`info@${dom}`),
  );
  console.log(`${validDomains.length} valid domains`);
  //Group all requests to the dns to verify domain names as a promise
  const domainsPromises = validDomains.map((domain) => {
    return validate(`info@${domain}`);
  });
  console.log(domainsPromises);
  interface domainPromise {
    isValidDomain: boolean;
    erorrMessage: Array<string>;
    invalidEmailList: Array<string>;
  }
  console.log('Validating domains...');
  //Resolve all requests at once
  const resolvePromise: Array<domainPromise> = (await Promise.all(
    domainsPromises,
  )) as Array<domainPromise>;
  console.log(resolvePromise);
  interface statusObj {
    [key: string]: boolean;
  }
  const domainsStatus: statusObj = {};
  validDomains.map((domain, index) => {
    domainsStatus[domain] = resolvePromise[index].isValidDomain;
  });
  console.log(domainsStatus);
  const validEmails = [];
  for (const email of emails) {
    if (domainsStatus[email.split('@')[1]]) {
      validEmails.push(email);
    }
  }
  validEmails.unshift('Emails');
  console.log(validEmails);
  fs.writeFileSync(outputFile, validEmails.join('\n'));
  console.log('done');
}

// validateEmailAddresses(['fixtures/inputs/small-sample.csv'], 'test.csv');

export default validateEmailAddresses;
