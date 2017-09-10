var splitInputString = require('./splitInputString');
var readFile = require('../fileOperation/readFile');
var judgeWhichDay = require('./judgeWhichDay');
var writeFile = require('../fileOperation/writeFile');

function cancelBadminton(cancelString) {
    var cancelObj = splitInputString(cancelString);
    readFile('./initInformation/spaceInfo.json', 'utf8', (spaceInfo)=> {
            var cancelSpaceInfo = spaceInfo[cancelObj.space];
            for (var i = 0; i < cancelSpaceInfo.bookInfo.length; i++) {
                var spaceObj = splitInputString(cancelSpaceInfo.bookInfo[i].bookInfoString);
                if (!(cancelObj.userId === spaceObj.userId && cancelObj.date === spaceObj.date && cancelObj.startTime === spaceObj.startTime && cancelObj.endTime === spaceObj.endTime && spaceObj && cancelSpaceInfo.bookInfo[i].ifBooked === true)) {
                continue;
                }
                else {
                    var whichDay = judgeWhichDay(spaceObj.date);
                    if (whichDay === 'week') {
                        spaceInfo[cancelObj.space].bookInfo[i].oneSubtotal = spaceInfo[cancelObj.space].bookInfo[i].oneSubtotal * 0.5;
                    }
                    else {
                        spaceInfo[cancelObj.space].bookInfo[i].oneSubtotal = spaceInfo[cancelObj.space].bookInfo[i].oneSubtotal * 0.25;

                    }
                    spaceInfo[cancelObj.space].bookInfo[i].ifBooked = false;
                    var updateDataJson = JSON.stringify(spaceInfo);
                    writeFile('./initInformation/spaceInfo.json', updateDataJson, (writeResult)=> {
                        if (writeResult) {
                            return console.log('Success: the booking is accepted!')
                        }
                    })
                }
            }

        return console.log('Error: the booking being cancelled does not exist!')

        }
    )
}

module.exports = cancelBadminton;
