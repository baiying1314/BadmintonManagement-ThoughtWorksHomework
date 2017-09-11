var splitInputString = require('./splitInputString');
function sortBookInfo(spaceInfo) {

    var spaces = ['A', 'B', 'C', 'D'];
    for (var i = 0; i < spaces.length; i++) {

        var spaceItem = spaceInfo[spaces[i]];

        if (spaceItem.bookInfo.length > 1) {
            spaceItem = sort(spaceItem.bookInfo);
        }
    }

    return spaceInfo;
}

function sort(bookInfo) {
    var sortedBookInfo = bookInfo.sort(compare('bookInfoString'));

    return sortedBookInfo;
}

function compare(property) {
    return function (obj1, obj2) {

        var value1 = obj1[property];
        var value2 = obj2[property];

        if (value1 > value2) {

            return 1;
        }
        else {

            return -1;
        }
    }
}

module.exports = sortBookInfo;
