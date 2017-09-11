var rl = require('./dataOperation/createInputInterface');
var statFile = require('./fileOperation/statFile');
var writeFile = require('./fileOperation/writeFile');
var dataInfo = require('./dataInfo/data');
var judgeInputFormat = require('./dataOperation/judgeInputFormat');

function main() {
    statFile('./initInformation/spaceInfo.json', (statSpaceResult)=> {
            if (!statSpaceResult) {
                createSpaceFile();
            } else {
                getUserInput();
            }
    });
}

function createSpaceFile() {
    var spaceInfoData = dataInfo.spaceInfo;

    writeFile('./initInformation/spaceInfo.json', spaceInfoData, (writeSpaceResult) => {
        if (writeSpaceResult) {
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