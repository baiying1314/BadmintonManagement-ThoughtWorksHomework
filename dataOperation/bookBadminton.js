var fs = require('fs');

var writeFile = require('../fileOperation/writeFile');
var readFile = require('../fileOperation/readFile');

function bookBadminton(inputString) {
    var inputDataObj = splitInputString(inputString);
    var ifInputRight = judgeInputRight(inputDataObj);
    if (ifInputRight) {
        judgeConflict(inputDataObj, (ifConflict)=> {
            if (!ifConflict) {
                console.log('Error: the booking conflicts with existing bookings!');
            }
            else {
                writeBookToFile(ifConflict, inputDataObj.space,inputString);
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
                var selectBook = splitInputString(selectBookInfo[i]);
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

function writeBookToFile(spaceInfo, selectSpace,inputString) {
    console.log(selectSpace);
    spaceInfo[selectSpace].bookInfo.push(inputString);
    var updateDataJson = JSON.stringify(spaceInfo);
    writeFile('./initInformation/spaceInfo.json', updateDataJson, (writeResult)=> {
        if (writeResult) {
            console.log('Success: the booking is accepted!');
        }
    });
}

module.exports = bookBadminton;