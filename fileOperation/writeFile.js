var fs = require('fs');

var writeFile = (path, writeData, callback)=> {
    fs.writeFileSync(path, writeData);
    callback(true);
};

module.exports = writeFile;