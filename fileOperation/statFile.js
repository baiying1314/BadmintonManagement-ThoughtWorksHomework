var fs = require('fs');
var statFile = (path, callback)=> {
    fs.stat(path, function (err, stat) {
        if (stat && stat.isFile()) {
            callback(true);
            return;
        }
        else {
            callback(false);
            return;
        }
    });
};

module.exports = statFile;