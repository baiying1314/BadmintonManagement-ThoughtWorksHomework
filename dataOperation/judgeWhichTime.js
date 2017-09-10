function judgeWhichTime(startTime, endTime) {
    var numStartTime = parseInt(startTime);
    var numEndTime = parseInt(endTime);
    var one = 0, two = 0, three = 0, four = 0, timeHours = 0;
    if (numEndTime <= 12) {
        timeHours = numEndTime - numStartTime;
        one += timeHours;
    }
    else if (numStartTime >= 20) {
        timeHours = numEndTime - numStartTime;
        four += timeHours;
    }
    else if (numStartTime >= 12 && numEndTime <= 18) {
        timeHours = numEndTime - numStartTime;
        two += timeHours;
    }
    else if (numStartTime >= 18 && numEndTime <= 20) {
        console.log('3');
        timeHours = numEndTime - numStartTime;
        three += timeHours;
    }
    else if ((9 <= numStartTime && numStartTime <= 12) && (12 < numEndTime && numEndTime <= 18)) {
        timeHours = 12 - numStartTime;
        one += timeHours;
        timeHours = numEndTime - 12;
        two += timeHours;
    }
    else if (9 <= numStartTime && numStartTime <= 12 && 18 < numEndTime && numEndTime <= 20) {
        timeHours = 12 - numStartTime;
        one += timeHours;
        two += 6;
        timeHours = numEndTime - 18;
        three += timeHours;
    }
    else if (9 <= numStartTime && numStartTime <= 12 && 20 < numEndTime && numEndTime <= 22) {
        timeHours = 12 - numStartTime;
        one += timeHours;
        two += 6;
        three += 2;
        timeHours = numEndTime - 20;
        four += timeHours;
    }
    else if (12 <= numStartTime && numStartTime <= 18 && 18 < numEndTime && numEndTime <= 20) {
        timeHours = 18 - numStartTime;
        two += timeHours;
        timeHours = numEndTime - 18;
        three += timeHours;
    }
    else if (12 <= numStartTime && numStartTime <= 18 && 20 < numEndTime && numEndTime <= 22) {
        timeHours = 18 - numStartTime;
        two += timeHours;
        three += 2;
        timeHours = numEndTime - 20;
        four += timeHours;
    }
    else if (18 <= numStartTime && numStartTime <= 20 && 20 < numEndTime && numEndTime <= 22) {
        timeHours = 20 - numStartTime;
        three += timeHours;
        timeHours = numEndTime - 20;
        four += timeHours;
    }
    var timeInfo = {
        "one": one,
        "two": two,
        "three": three,
        "four": four,
    };
    return timeInfo;
}

judgeWhichTime('20:00', '22:00');