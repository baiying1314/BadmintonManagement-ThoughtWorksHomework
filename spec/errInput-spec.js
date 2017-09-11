var judgeInputFormat = require('./../dataOperation/judgeInputFormat');

describe('unit-booking', ()=> {
    var bookInputString;
    it('should input correct string', ()=> {
        bookInputString = 'sdfghjkl';
        spyOn(console, "log");
        judgeInputFormat(bookInputString);
        expect(console.log).toHaveBeenCalledWith('Error: the booking is invalid!');
    });

   bookInputString = 'U005 2017-08-05 11:00~11:00 D';
    it("start should less than endtime", ()=> {
        spyOn(console, "log");
        judgeInputFormat(bookInputString);
        expect(console.log).toHaveBeenCalledWith('Error: the booking is invalid!');
    });
});