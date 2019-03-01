const shell = require('shelljs');
const config = require('config');
const colors = require('colors');

const host = config.get('host') || 'http://18.224.146.61';
const port = config.get('port') || '4000';
console.log(host,port);
const option = process.argv[2];

switch (option) {
  case 'lint':
    shell.exec('cross-env eslint src/js/** server/** --format node_modules/eslint-friendly-formatter . --ext .js --ext .jsx  --cache; exit 0');
    break;
  case 'dev':
    shell.exec(`cross-env HOST=${host} PORT=${port} webpack-dev-server --hot --progress --inline --colors --content-base ./dist`);
    break;
  case 'build':
    shell.exec(`cross-env rimraf dist && webpack --progress`);
    break;
  default:
    // If the app type is invalid, stop execution of the file.
    console.log(colors.green('Invalid option.'));
    console.log(colors.green('See README.md for more details.'));
    return;
}
