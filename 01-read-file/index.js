const fs = require('fs')
const path = require('path')
// let readStream = fs.createReadStream(__dirname + "/text.txt")
// readStream.pipe(process.stdout)
var stream = new fs.ReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
 
stream.on('readable', function(){
    var data = stream.read();
    console.log(data);
});