var rl = require('./dataOperation/createInputInterface');
var statFile = require('./fileOperation/statFile');
var writeFile = require('./fileOperation/writeFile');
var dataInfo = require('./dataInfo/data');
var judgeInputFormat = require('./dataOperation/judgeInputFormat');

function main() {
    statFile('./initInformation/spaceInfo.json', (statSpaceResult)=> {
        statFile('./initInformation/chargeInfo.json', (statChargeResult) => {
            if (!statChargeResult) {
                createChargeFile();
            } else if (!statSpaceResult) {
                createSpaceFile();
            } else {
                getUserInput();
            }
        });
    });
}

function createChargeFile() {
    var chargesInfoData = dataInfo.chargeInfo;

    writeFile('./initInformation/chargeInfo.json', chargesInfoData, (writeChargeResult)=> {
        if (statSpaceResult && writeChargeResult) {
            getUserInput();
        }
    });
}

function createSpaceFile() {
    var spaceInfoData = dataInfo.spaceInfo;

    writeFile('./initInformation/spaceInfo.json', spaceInfoData, (writeSpaceResult) => {
        if (writeSpaceResult && statChargeResult) {
            getUserInput();
        }
    });
}

function getUserInput() {
    rl.on('line', (aswer)=> {
        judgeInputFormat(aswer);
    })
}

main();