const fs = require('fs')
 fs.readdir(__dirname + '/secret-folder',{withFileTypes: true},(err, files) =>{
    if(err){
        console.log(err);
    }
    for (let i = 0; i < files.length; i++) {
        fs.stat(__dirname + `/secret-folder/${files[i].name}`,(err, stat) =>{
            if(err){
                console.log(err);
            }
            if (!stat.isDirectory()){
                console.log(`${files[i].name.slice(0,files[i].name.indexOf('.'))} - ${files[i].name.slice(files[i].name.indexOf('.') + 1, files[i].name.length)} - ${Math.round(stat.size / 1024)} - kb`);
            }
        })
        
    }
    
})


