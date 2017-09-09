var fs = require('fs');

var statFile = require('./fileOperation/statFile');
var writeFile = require('./fileOperation/writeFile');

var dataInfo = require('./dataInfo/data');

statFile('./initInformation/spaceInfo.json', (statSpaceResult)=> {
    if (statSpaceResult) {
        statFile('./initInformation/chargeInfo.json', (statChargeResult) => {
            if (statChargeResult) {
                console.log('文件存在');
            }
            else {
                var chargesInfoData = dataInfo.chargeInfo;
                writeFile('./initInformation/chargeInfo.json', chargesInfoData, (writeChargeResult)=> {
                    if (writeChargeResult) {
                        console.log('write ChargeInfo successfully');
                    }
                    else {
                        console.log('write ChargeInfo unsuccessfully');
                    }
                })
            }
        })
    } else {
        var spaceInfoData = dataInfo.spaceInfo;
        writeFile('./initInformation/spaceInfo.json', spaceInfoData, (writeSpaceResult) => {
            if (writeSpaceResult) {
                statFile('./initInformation/chargeInfo.json', (statChargeResult) => {
                    if (statChargeResult) {
                        console.log('文件存在');
                    }
                    else {
                        var chargesInfoData = `{"weekCharges":{"one":30,"two":50,"three":80,"four":60},"weekendCharges":{"one":40,"two":50,"three":60}}`;
                        writeFile('./initInformation/chargeInfo.json', chargesInfoData, (writeChargeResult)=> {
                            if (writeChargeResult) {
                                console.log('write ChargeInfo successfully');
                            }
                            else {
                                console.log('write ChargeInfo unsuccessfully');
                            }
                        })
                    }
                })
            }
            else {
                console.log('err');
            }
        })
    }
});