const fs = require('fs')
const path = require("path");

fs.mkdir(__dirname + "/project-disk", (err) =>{
    
})


let includes = fs.readdirSync(path.join(__dirname, "styles"));
let res = [];
for (let i = 0; i < includes.length; i++) {
  if (
    includes[i].slice(includes[i].indexOf(".") + 1, includes[i].length) == "css"
  ) {
    res.push(includes[i]);
  }
}

let css = "";
let filesLoaded = 0;
let fileTotal = res.length;

(compileFile = function () {
  fs.readFile(
    path.join(__dirname, "styles", res[filesLoaded]),
    "utf8",
    function readFileResponse(err, data) {
      if (err) {
        console.log(err);
      } else {
        css += data;
        filesLoaded++;
        if (filesLoaded >= fileTotal) {
          writeIndex();
          return;
        }
        compileFile();
      }
    }
  );
}),
  (writeIndex = function () {
    fs.writeFile(path.join(__dirname, "style.css"), css, function (err) {
      if (err) {
        console.log("file not written: " + err);
      } 
    });
  });

compileFile();


fs.readdir(path.join(__dirname, 'assets'), (err, nameFile)=>{
    console.log(nameFile);
    for (let i = 0; i < nameFile.length; i++) {
        fs.mkdir(path.join(__dirname, 'project-disk', nameFile[i]), (err) =>{
            console.log(err);
        })
        
        
    }
})
