const fs = require('fs')
 fs.readdir(__dirname + '/secret-folder',{withFileTypes: true},(err, files) =>{
    if(err){
        console.log(err);
    }
    console.log(files);
})

