var fs = require('fs');


function bookBadminton(inputString) {

    var bookInputArr = inputString.split(' ');
    var inputStartTime = bookInputArr[2].split('~')[0];
    var inputEndTime = bookInputArr[2].split('~')[1];
    if (inputEndTime > inputStartTime && (inputStartTime >= '09:00' && inputEndTime <= '22:00')) {
        fs.readFile('./initInformation/spaceInfo.json', 'utf8', function (err, data) {
            if (!err) {
                var spaceInfo = JSON.parse(data);
                var selectSpace = bookInputArr[bookInputArr.length - 1];
                var correspondSpace = spaceInfo[selectSpace];
                var selectBookInfo = correspondSpace.bookInfo;
                for (var i = 0; i < selectBookInfo.length; i++) {
                    var selectBookArr = selectBookInfo[i].split(' ');
                    if (bookInputArr[1] === selectBookArr[1]) {
                        var selectItemStartTime = selectBookArr[2].split('~')[0];
                        var selectItemEndTime = selectBookArr[2].split('~')[1];
                        if (!(inputEndTime < selectItemStartTime || inputStartTime > selectItemEndTime)) {
                            console.log('Error: the booking conflicts with existing bookings!');
                            break;
                        }
                    }
                }
                if (i >= selectBookInfo.length) {
                    selectBookInfo.push(inputString);
                    var updateDataJson = JSON.stringify(spaceInfo);
                    fs.writeFile('./initInformation/spaceInfo.json', updateDataJson, (err)=> {
                        if (!err) {
                            console.log('Success: the booking is accepted!');
                        }
                    });
                }
            }
        });
    }
}

module.exports = bookBadminton;