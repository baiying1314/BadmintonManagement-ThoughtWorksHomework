function whichDay(s) {
    var which = new Date(s).getDay();
    if (which === 0 || which === 6) {
        return console.log('weekEnd');
    }
    if (0 < which && which < 6) {
        return console.log('week');
    }
}

module.exports = whichDay;