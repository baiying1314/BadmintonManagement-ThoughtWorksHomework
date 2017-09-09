var fs = require('fs');

var statFile = require('./fileOperation/statFile');
var writeFile = require('./fileOperation/writeFile');

var dataInfo = require('./dataInfo/data');

statFile('./initInformation/spaceInfo.json', (statSpaceResult)=> {
    statFile('./initInformation/chargeInfo.json', (statChargeResult) => {
        if (statSpaceResult && statChargeResult) {
            console.log('success');
        }
        else {
            if (!statChargeResult) {
                var chargesInfoData = dataInfo.chargeInfo;
                writeFile('./initInformation/chargeInfo.json', chargesInfoData, (writeChargeResult)=> {
                    if (!writeChargeResult) {
                        console.log('err');
                    }
                    else {
                        console.log('write ChargeInfo successfully');

                    }
                });
            }
            if (!statSpaceResult) {
                var spaceInfoData = dataInfo.spaceInfo;

                writeFile('./initInformation/spaceInfo.json', spaceInfoData, (writeSpaceResult) => {
                    if (!writeSpaceResult) {
                        console.log('err');
                    }
                    else {
                        console.log('write spaceInfo successfully');

                    }
                });
            }
        }
    });
});