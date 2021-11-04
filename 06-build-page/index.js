const fs = require('fs')
const path = require("path");

fs.mkdir(__dirname + "/project-dist", (err) =>{
    
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
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), (err) =>{
        console.log(err);
        console.log('MKDIR ASSETS');
    })
    for (let i = 0; i < nameFile.length; i++) {
        fs.mkdir(path.join(__dirname, 'project-dist', "assets", nameFile[i]), (err) =>{
            console.log(err);
            console.log('MKDIR ASSETS FILE');
        })
    }
})



let dataComponent = ''
let arrComponet = []
fs.readdir(path.join(__dirname, 'components'),(err, fileComponent)=>{
    console.log('############################');
    console.log(fileComponent);
    console.log('############################');
    let html = ''
    for (let i = 0; i < fileComponent.length; i++) {
      let readStream =  fs.createReadStream(path.join(__dirname, 'components' ,fileComponent[i]))  
      html += readStream.read()
       console.log(html);
    }
})










fs.rename(path.join(__dirname, 'template.html'),path.join(__dirname, 'project-dist','index.html'),(err)=>{if (err) console.log(err);})
// fs.rename(path.join(__dirname, 'assets',nameFile[i]),path.join(__dirname, 'project-dist',nameFile[i]),()=>{
//     if(err){
//         console.log(err);
//         console.log('файлы перемешееы');
//     }
// })

// fs.copyFile(path.join(__dirname, 'project-dist', nameFile[i]), path.join(__dirname, 'project-dist',nameFile[i]),(err)=>{
//     if (err){
//         console.log(err);
//     }
// })




