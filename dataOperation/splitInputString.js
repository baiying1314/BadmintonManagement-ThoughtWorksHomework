function splitInputString(spaceString) {
    var bookInputArr = spaceString.split(" ");
    if(bookInputArr.length >2){
        var userId = bookInputArr[0];
        var date = bookInputArr[1];
        var startTime = bookInputArr[2].split('~')[0];
        var endTime = bookInputArr[2].split('~')[1];
        var space = bookInputArr[3];
        return {userId, date, startTime, endTime, space}

    }
    else {
        var date = bookInputArr[0];
        var startTime = bookInputArr[1].split('~')[0];
        var endTime = bookInputArr[1].split('~')[1];
        return {date, startTime, endTime}
    }
}

module.exports = splitInputString;