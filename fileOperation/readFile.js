var fs = require('fs');

var readFile = (path, charset, callback)=> {
    fs.readFile(path, charset, (err, data)=> {
        if (!err) {
            var spaceInfo = JSON.parse(data);
            return callback(spaceInfo);
        }
        return;
    })
};

module.exports = readFile;