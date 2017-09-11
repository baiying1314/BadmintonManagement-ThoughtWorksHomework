var fs = require('fs');

var readFile = (path, charset, callback)=> {
    var data = fs.readFileSync(path, charset);
    var spaceInfo = JSON.parse(data);
    callback(spaceInfo);
};

module.exports = readFile;