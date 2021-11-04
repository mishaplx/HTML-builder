const fs = require("fs");


const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });
let _input = ''
console.log("Hello, please enter text");
rl.on("line", (input) => {
    if (input == 'exit'){
      console.log('good buy');
        process.exit()
    }
  _input += input + '\n';
  let writeSteam = fs.createWriteStream(__dirname + "/out.txt");
  writeSteam.write(_input);
});
