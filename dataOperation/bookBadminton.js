var fs = require('fs');

var writeFile = require('../fileOperation/writeFile');
var readFile = require('../fileOperation/readFile');
var judgeDay = require('../dataOperation/judgeWhichDay');
var judgeTime = require('../dataOperation/judgeWhichTime');
var chargeInfo = require('../initInformation/chargeInfo.json');

function bookBadminton(inputString) {
    var inputDataObj = splitInputString(inputString);
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
}

function splitInputString(spaceString) {
    var bookInputArr = spaceString.split(' ');
    var userId = bookInputArr[0];
    var date = bookInputArr[1];
    var startTime = bookInputArr[2].split('~')[0];
    var endTime = bookInputArr[2].split('~')[1];
    var space = bookInputArr[3];

    return {userId, date, startTime, endTime, space}
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
                var selectBook = splitExistString(selectBookInfo[i].bookInfoString);
                if (inputDataObj.date === selectBook.date) {
                    var selectItemStartTime = selectBook.startTime;
                    var selectItemEndTime = selectBook.endTime;
                    if (!(inputDataObj.endTime < selectItemStartTime || inputDataObj.startTime > selectItemEndTime)) {
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
    console.log(whichDay);
    if (whichDay === 'week') {
        oneSubtotal += whichTime.one * chargeInfo.week.one + whichTime.two * chargeInfo.week.two + whichTime.three * chargeInfo.week.three + whichTime.four * chargeInfo.week.four;
    } else if(whichDay === 'weekend'){
        oneSubtotal += whichTime.one * chargeInfo.weekend.one + whichTime.two * chargeInfo.weekend.two + whichTime.three * chargeInfo.weekend.three + whichTime.four * chargeInfo.weekend.four;

    }
    var bookInfoString = `${inputDataObj.date} ${inputDataObj.startTime}~${inputDataObj.endTime}`;
    spaceInfo[inputDataObj.space].bookInfo.push({bookInfoString, oneSubtotal});
    var updateDataJson = JSON.stringify(spaceInfo);
    writeFile('./initInformation/spaceInfo.json', updateDataJson, (writeResult)=> {
        if (writeResult) {
            console.log('Success: the booking is accepted!');
        }
    });
}

function splitExistString(string) {
    var spaceArr = string.split(' ');
    var date = spaceArr[0];
    var startTime = spaceArr[1].split('~')[0];
    var endTime = spaceArr[1].split('~')[1];

    return {date, startTime, endTime}
}

module.exports = bookBadminton;