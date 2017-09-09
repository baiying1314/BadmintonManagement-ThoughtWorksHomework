var fs = require('fs');

fs.stat('./initInformation/spaceInfo.json', function (err, stat) {
    if (stat && stat.isFile()) {
        console.log('文件存在');
    } else {
        var spaceInfoData = `{
  "spaceInfo": [
    {
      "A": {
        "bookInfo": [],
        "subtotal": 0
      }
    },
    {
      "B": {
        "bookInfo": [],
        "subtotal": 0
      }
    },
    {
      "C": {
        "bookInfo": [],
        "subtotal": 0
      }
    },
    {
      "D": {
        "bookInfo": [],
        "subtotal": 0
      }
    }
  ],
  "total": 0
}`;
        fs.writeFile('./initInformation/spaceInfo.json', spaceInfoData, function (err) {
            if (err) {
                return console.error(err);
            }
            return;
        })
    }
});