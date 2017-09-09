var fs = require('fs');

fs.stat('./initInformation/spaceInfo.json', function (err, stat) {
    if (stat && stat.isFile()) {
        fs.stat('./initInformation/chargesInfo.json', function (err, stat) {
            if (stat && stat.isFile()) {
                console.log('存在')
            }
            else {
                var chargesInfoData = `{"weekCharges":{"one":30,"two":50,"three":80,"four":60},"weekendCharges":{"one":40,"two":50,"three":60}}`;
                fs.writeFile('./initInformation/chargeInfo.json', chargesInfoData, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    return;
                })
            }
        })
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