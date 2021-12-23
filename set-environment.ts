const fs = require('fs');
const colors = require('colors');

// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';

// `environment.ts` file structure
const envConfigFile = `
  export const environment = {
    production: true,
    brand: '${process.env.BRAND}'
  };
`;

console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));

fs.writeFile(targetPath, envConfigFile, function (err: any) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
   }
});