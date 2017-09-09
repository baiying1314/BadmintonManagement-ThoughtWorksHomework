var fs = require('fs');

fs.stat('./initInformation/spaceInfo.json', function(err, stat){
    if(stat&&stat.isFile()) {
        console.log('文件存在');
    } else {
        console.log('文件不存在或不是标准文件');
    }
});