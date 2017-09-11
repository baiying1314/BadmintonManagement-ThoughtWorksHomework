var writeFile = require('../fileOperation/writeFile');
var readFile = require('../fileOperation/readFile');
var judgeDay = require('../dataOperation/judgeWhichDay');
var judgeTime = require('../dataOperation/judgeWhichTime');
var chargeInfo = require('../initInformation/chargeInfo.json');
var splitInputString = require('./splitInputString');

function bookBadminton(bookString) {
    var inputDataObj = splitInputString(bookString);
    var ifInputRight = judgeInputRight(inputDataObj);
    if (ifInputRight) {
        judgeConflict(inputDataObj, (ifConflict)=> {
            if (!ifConflict) {
                console.log('Error: the booking conflicts with existing bookings!');
            }
            else {
                writeBookToFile(ifConflict, inputDataObj);
            }
        });
    }
    else {
        console.log('Error: the booking is invalid!');
    }
}


function judgeInputRight(inputDataObj) {
    if (inputDataObj.endTime > inputDataObj.startTime && (inputDataObj.startTime >= '09:00' && inputDataObj.endTime <= '22:00')) {
        return true;
    }
    return false;
}

function judgeConflict(inputDataObj, callback) {
    readFile('./initInformation/spaceInfo.json', 'utf8', (spaceInfo)=> {
            var selectSpace = inputDataObj.space;
            var correspondSpace = spaceInfo[selectSpace];
            var selectBookInfo = correspondSpace.bookInfo;

            for (var i = 0; i < selectBookInfo.length; i++) {
                var selectBook = splitInputString(selectBookInfo[i].bookInfoString);
                if (inputDataObj.date === selectBook.date) {
                    var ifBooked = selectBookInfo[i].ifBooked;
                    var selectItemStartTime = selectBook.startTime;
                    var selectItemEndTime = selectBook.endTime;
                    if (ifBooked) {
                        if (!(inputDataObj.endTime < selectItemStartTime || inputDataObj.startTime > selectItemEndTime))
                            return callback(false);
                    }
                }
            }
            if (i >= selectBookInfo.length) {
                return callback(spaceInfo);
            }
        }
    );
}

function writeBookToFile(spaceInfo, inputDataObj) {
    var oneSubtotal = 0;
    var whichDay = judgeDay(inputDataObj.date);
    var whichTime = judgeTime(inputDataObj.startTime, inputDataObj.endTime);
    if (whichDay === 'week') {
        oneSubtotal += whichTime.one * chargeInfo.week.one + whichTime.two * chargeInfo.week.two + whichTime.three * chargeInfo.week.three + whichTime.four * chargeInfo.week.four;
    } else {
        oneSubtotal += whichTime.one * chargeInfo.weekend.one + whichTime.two * chargeInfo.weekend.two + whichTime.three * chargeInfo.weekend.three + whichTime.four * chargeInfo.weekend.four;
    }
    var bookInfoString = `${inputDataObj.date} ${inputDataObj.startTime}~${inputDataObj.endTime}`;
    var ifBooked = true;
    var userId = `${inputDataObj.userId}`;
    spaceInfo[inputDataObj.space].bookInfo.push({userId, bookInfoString, oneSubtotal, ifBooked});
    spaceInfo[inputDataObj.space].subtotal += oneSubtotal;
    spaceInfo.total += oneSubtotal;
    var updateDataJson = JSON.stringify(spaceInfo);
    writeFile('./initInformation/spaceInfo.json', updateDataJson, (writeResult)=> {
        if (writeResult) {
            console.log('Success: the booking is accepted!');
        }
    });
}

module.exports = bookBadminton;

