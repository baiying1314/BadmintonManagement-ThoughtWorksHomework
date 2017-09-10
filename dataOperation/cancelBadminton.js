var splitInputString = require('./splitInputString');
var readFile = require('../fileOperation/readFile');
var judgeWhichDay = require('./judgeWhichDay');
var fs = require('fs');

function cancelBadminton(cancelString) {
    var cancelObj = splitInputString(cancelString);
    readFile('./initInformation/spaceInfo.json', 'utf8', (spaceInfo)=> {
        var cancelSpaceInfo = spaceInfo[cancelObj.space];
        for (var i = 0; i < cancelSpaceInfo.bookInfo.length; i++) {
            var spaceObj = splitInputString(cancelSpaceInfo.bookInfo[i].bookInfoString);
            if ((cancelObj.userId === spaceObj.userId && cancelObj.date === spaceObj.date && cancelObj.startTime === spaceObj.startTime && cancelObj.endTime === spaceObj.endTime && spaceObj && cancelSpaceInfo.bookInfo[i].ifBooked === true)) {
                var whichDay = judgeWhichDay(spaceObj.date);
                if (whichDay === 'week') {
                    var oneSubtotal = spaceInfo[cancelObj.space].bookInfo[i].oneSubtotal * 0.5;
                    spaceInfo[cancelObj.space].bookInfo[i].oneSubtotal -= oneSubtotal;
                    spaceInfo[cancelObj.space].subtotal -= oneSubtotal;
                    spaceInfo.total -= oneSubtotal;
                }
                else {
                    oneSubtotal = spaceInfo[cancelObj.space].bookInfo[i].oneSubtotal * 0.75;
                    spaceInfo[cancelObj.space].bookInfo[i].oneSubtotal -= oneSubtotal;
                    spaceInfo[cancelObj.space].subtotal -= oneSubtotal;
                    spaceInfo.total -= oneSubtotal;
                }
                spaceInfo[cancelObj.space].bookInfo[i].ifBooked = false;
                var updateDataJson = JSON.stringify(spaceInfo);

                fs.writeFileSync('./initInformation/spaceInfo.json', updateDataJson);
                return console.log('Success: the booking is accepted!');
            }
        }

        if (i == cancelSpaceInfo.bookInfo.length) {
            return console.log('Error: the booking being cancelled does not exist!');
        }
    });
}
module.exports = cancelBadminton;
