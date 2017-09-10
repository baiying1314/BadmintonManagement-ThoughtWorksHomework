function whichDay(s) {
    var which = new Date(s).getDay();
    if (which === 0 || which === 6) {
        return 'weekEnd';
    }
    if (0 < which && which < 6) {
        return 'week';
    }
}

module.exports = whichDay;