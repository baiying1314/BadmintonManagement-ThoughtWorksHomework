var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var statFile = require('./fileOperation/statFile');
var writeFile = require('./fileOperation/writeFile');
var dataInfo = require('./dataInfo/data');
var judgeInputFormat = require('./dataOperation/judgeInputFormat');


statFile('./initInformation/spaceInfo.json', (statSpaceResult)=> {
    statFile('./initInformation/chargeInfo.json', (statChargeResult) => {
        if (!statChargeResult) {

            var chargesInfoData = dataInfo.chargeInfo;

            writeFile('./initInformation/chargeInfo.json', chargesInfoData, (writeChargeResult)=> {
                if (writeChargeResult) {
                    console.log('write ChargeInfo successfully');
                }
                if (statSpaceResult && writeChargeResult) {
                    rl.on('line', (aswer)=> {
                        judgeInputFormat(aswer);
                    })
                }
            });
        }

        else if (!statSpaceResult) {

            var spaceInfoData = dataInfo.spaceInfo;

            writeFile('./initInformation/spaceInfo.json', spaceInfoData, (writeSpaceResult) => {
                if (writeSpaceResult) {
                    console.log('write spaceInfo successfully');
                }
                if (writeSpaceResult && statChargeResult) {
                    rl.on('line', (aswer)=> {
                        judgeInputFormat(aswer);
                    })
                }
            });
        }
    });
});