const fs = require('fs')
let readStream = fs.createReadStream(__dirname + "/text.txt")
readStream.pipe(process.stdout)