var bookBadminton = require('./bookBadminton');

function judgeInputFormat(inputString) {
    var regBook = /^\w{3,5}\s[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):00~(20|21|22|23|[0-1]\d):00\s[A|B|C|D]$/;
    var regBookCancel = /^\w{3,5}\s[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):00~(20|21|22|23|[0-1]\d):00\s[A|B|C|D]\s[C]$/;
    var regSummary = /^\s$/;
    if (regBook.test(inputString)) {
        bookBadminton(inputString);
    }
    else if (regBookCancel.test(inputString)) {
        console.log('cancel');
    }
    else if (regSummary.test(inputString)) {
        console.log('sumarry')
    }
    else {
        console.log('err');
    }

}

module.exports = judgeInputFormat;