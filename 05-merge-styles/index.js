const fs = require("fs");
const path = require("path");

let includes = fs.readdirSync(path.join(__dirname, "styles"));
let res = [];
for (let i = 0; i < includes.length; i++) {
  if (
    includes[i].slice(includes[i].indexOf(".") + 1, includes[i].length) == "css"
  ) {
    res.push(includes[i]);
  }
}

var startTime = Date.now();
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
          var oldPath = path.join(__dirname, "bundle.css");
          var newPath = path.join(__dirname, "project-dist", "bundle.css");

          fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;
          });
          return;
        }
        compileFile();
      }
    }
  );
}),
  (writeIndex = function () {
    fs.writeFile(path.join(__dirname, "bundle.css"), css, function (err) {
      if (err) {
        console.log("file not written: " + err);
      } else {
        console.log(
          "Compiled file in " + String(Date.now() - startTime) + "ms"
        );
      }
    });
  });

compileFile();
