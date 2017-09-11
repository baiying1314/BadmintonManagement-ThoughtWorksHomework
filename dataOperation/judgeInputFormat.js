var bookBadminton = require('./bookBadminton');
var cancelBadminton = require('./cancelBadminton');
var createPrintString = require('./printSummary');

function judgeInput(inputString) {
    var regBook = /^\w{3,5}\s[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):00~(20|21|22|23|[0-1]\d):00\s[A|B|C|D]$/;
    var regBookCancel = /^\w{3,5}\s[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):00~(20|21|22|23|[0-1]\d):00\s[A|B|C|D]\s[C]$/;
    var regSummary = /^\s$/;
    whichType(inputString, regBook, regBookCancel, regSummary)
}

function whichType(inputString, regBook, regBookCancel, regSummary) {
    if (regBook.test(inputString)) {
        bookBadminton(inputString);
    }
    else if (regBookCancel.test(inputString)) {
        cancelBadminton(inputString);
    }
    else if (regSummary.test(inputString)) {
        createPrintString();
    }
    else {
        console.log('Error: the booking is invalid!');
    }
}

module.exports = judgeInput;