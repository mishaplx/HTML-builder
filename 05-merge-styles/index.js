const fs = require("fs");
const path = require("path");


fs.mkdir(path.join(__dirname, 'project-list'), err =>{
    if (err) console.log(err);
})

let includes =  fs.readdirSync(path.join(__dirname, 'styles'));
let res = []
for (let i = 0; i < includes.length; i++) {
    if (includes[i].slice(includes[i].indexOf('.') + 1, includes[i].length) == "css"){
        res.push(includes[i])
    }
    
}
console.log(res);
var startTime = Date.now();
let  css = "";
let filesLoaded = 0;
let  fileTotal = res.length;

    compileFile = function() {
        fs.readFile(path.join(__dirname, "styles", res[filesLoaded]),  'utf8', function readFileResponse(err, data) {
            if(err) {
                console.log(err);
            } else {
                css += data;
                filesLoaded++;
                if(filesLoaded >= fileTotal) {
                    writeIndex();
                    return;
                }
                compileFile();
            }
        });
    },
    writeIndex = function() {
            //console.log(html);
            fs.writeFile(path.join(__dirname, 'bundle.css'), css, function(err) {
                if(err) {
                    console.log("file not written: " + err);
                } else {
                    console.log("Compiled file in " + String(Date.now() - startTime) + "ms");
                }
            });
    }

compileFile();