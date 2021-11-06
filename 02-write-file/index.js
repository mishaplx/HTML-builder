const fs = require("fs");


const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const path = require("path/posix");

function fileHandler(){

  fs.open(path.join(__dirname, 'out.txt'), 'w', (err) => {
      if(err) throw err;
      
  });
  
}

console.log("Hello, please enter text");
fileHandler()
const rl = readline.createInterface({ input, output });
let _input = ''
rl.on("line", (input) => {
  if (input == 'exit'){
    console.log('good buy');
    process.exit()
  }
  _input += input + '\n';
  let writeSteam = fs.createWriteStream(__dirname + "/out.txt");
  writeSteam.write(_input);
});
