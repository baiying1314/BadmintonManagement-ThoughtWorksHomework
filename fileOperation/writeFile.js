var fs = require('fs');

var writeFile = (path,writeData,callback)=> {
    fs.writeFile(path, writeData, function (err) {
        if (err) {
            callback(false);
            return;
        }
       callback(true);
        return;
    })
};

module.exports = writeFile;