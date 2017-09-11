var readFile = require('../fileOperation/readFile');
var sortBookInfo = require('./sortBookInfo');

var splitInputString = require('./splitInputString');
function createPrintString() {
    readFile('./initInformation/spaceInfo.json', 'utf-8', (spaceInfoun)=> {
        var spaceInfo = sortBookInfo(spaceInfoun);
        var spaceAString = createEverySpaceString(spaceInfo, 'A');
        var spaceBString = createEverySpaceString(spaceInfo, 'B');
        var spaceCString = createEverySpaceString(spaceInfo, 'C');
        var spaceDString = createEverySpaceString(spaceInfo, 'D');
        var total = spaceInfo.total;
        var printString = `收入汇总
---
场地:A${spaceAString}

场地:B${spaceBString}

场地:C${spaceCString}

场地:D${spaceDString}
---
总计: ${total}元`;
        console.log(printString);
    });

};


function createEverySpaceString(spaceInfo, whichSpace) {
    var spaceItemInfo = spaceInfo[whichSpace];
    var bookInfo = spaceItemInfo.bookInfo;
    var everySpacestring = ``;
    var subtotal = spaceItemInfo.subtotal;
    for (var i = 0; i < bookInfo.length; i++) {
        var item = bookInfo[i];
        var itemInfoObj = splitInputString(item.bookInfoString);
        if (item.ifBooked) {
            everySpacestring += `
${itemInfoObj.date} ${itemInfoObj.startTime}~${itemInfoObj.endTime} ${item.oneSubtotal}元`
        }
        else {
            everySpacestring += `
${itemInfoObj.date} ${itemInfoObj.startTime}~${itemInfoObj.endTime} 违约金 ${item.oneSubtotal}元`
        }
    }
    everySpacestring += `
小计：${subtotal}元`;
    return everySpacestring;
}

module.exports = createPrintString;