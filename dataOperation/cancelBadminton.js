var splitInputString = require('./splitInputString');
var readFile = require('../fileOperation/readFile');
var judgeWhichDay = require('./judgeWhichDay');
var fs = require('fs');

function cancelBadminton(cancelString) {
    var cancelObj = splitInputString(cancelString);
    readFile('./initInformation/spaceInfo.json', 'utf8', (spaceInfo)=> {
        var cancelSpaceInfo = spaceInfo[cancelObj.space];
        for (var i = 0; i < cancelSpaceInfo.bookInfo.length; i++) {
            var spaceItem = cancelSpaceInfo.bookInfo[i];
            var spaceObj = splitInputString(spaceItem.bookInfoString);
            var exist = ifExist(spaceItem, spaceObj, cancelObj);
            if (exist) {
                var whichDay = judgeWhichDay(spaceObj.date);
                var updateDataJson = modifyTotal(whichDay, spaceInfo, spaceItem, cancelSpaceInfo);
                fs.writeFileSync('./initInformation/spaceInfo.json', updateDataJson);
                return console.log('Success: the booking is accepted!');
            }
        }
            return console.log('Error: the booking being cancelled does not exist!');
    });
}

function modifyTotal(whichDay, spaceInfo, spaceItem, cancelSpaceInfo) {
    if (whichDay === 'week') {
        var oneSubtotal = spaceItem.oneSubtotal * 0.5;
        spaceItem.oneSubtotal -= oneSubtotal;
        cancelSpaceInfo.subtotal -= oneSubtotal;
        spaceInfo.total -= oneSubtotal;
    }
    else {
        oneSubtotal = spaceItem.oneSubtotal * 0.75;
        spaceItem.oneSubtotal -= oneSubtotal;
        cancelSpaceInfo.subtotal -= oneSubtotal;
        spaceInfo.total -= oneSubtotal;
    }
    spaceItem.ifBooked = false;
    var updateDataJson = JSON.stringify(spaceInfo);
    return updateDataJson;
}

function ifExist(spaceItem, spaceObj, cancelObj) {
    return (spaceItem.userId === spaceItem.userId && cancelObj.date === spaceObj.date && cancelObj.startTime === spaceObj.startTime && cancelObj.endTime === spaceObj.endTime && spaceObj && spaceItem.ifBooked === true)
}
module.exports = cancelBadminton;
