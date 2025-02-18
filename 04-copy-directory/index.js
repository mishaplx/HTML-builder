const fs = require("fs");
const path = require("path");

fs.stat(path.join(__dirname, "file-copy"), function (err) {
  fs.readdir(
    path.join(__dirname, "file-copy"),
    { withFileTypes: true },
    (err, files) => {
      files.forEach((el)=>{
        fs.unlink(path.join(__dirname, "file-copy", el.name), (err) => {
         
        });
      })
      // for (let i = 0; i < files.length; i++) {
      //   fs.unlink(path.join(__dirname, "file-copy", files[i].name), (err) => {
         
      //   });
      // }
    }
  );
  if (!err) {
    console.log("Директория есть, файлы скопированны");
  } else if (err.code === "ENOENT") {
    fs.mkdir(path.join(__dirname, "file-copy"), (err) => {
      if (err) console.log(err);
    });
    console.log("Файлы скопированны");
  }
});

fs.readdir(
  path.join(__dirname, "files"),
  { withFileTypes: true },
  (err, files) => {
    for (let i = 0; i < files.length; i++) {
      fs.copyFile(
        path.join(__dirname, "files", files[i].name),
        path.join(__dirname, "file-copy", files[i].name),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  }
);
