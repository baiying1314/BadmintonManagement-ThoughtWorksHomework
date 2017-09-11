var judgeInputFormat = require('./../dataOperation/judgeInputFormat');

describe('unit-booking', ()=> {
    var bookInputString = 'U002 2017-08-01 19:00~22:00 A';
    beforeEach(()=> {
        spyOn(console, "log");
    });
    it("should booking one did not exist", (done)=> {
        judgeInputFormat(bookInputString);
        expect(console.log).toHaveBeenCalledWith('Success: the booking is accepted!');
        done();
    });
});

describe('', ()=> {
    var bookInputString = 'U002 2017-08-01 19:00~22:00 A';
    it("should booking one did not exist", (done)=> {
        spyOn(console, "log");

        judgeInputFormat(bookInputString);
        expect(console.log).toHaveBeenCalledWith('Error: the booking conflicts with existing bookings!');
        done();
    });
});

describe('', ()=> {
    var bookInputString = 'U002 2017-08-01 19:00~22:00 A C';
    it("should cancel one did exist", (done)=> {
        spyOn(console, "log");

        judgeInputFormat(bookInputString);
        expect(console.log).toHaveBeenCalledWith('Success: the booking is accepted!');
        done();
    });
});

describe('', ()=> {
    var bookInputString = 'U002 2017-08-01 19:00~22:00 A C';
    it("should cancel one did exist", (done)=> {
        spyOn(console, "log");

        judgeInputFormat(bookInputString);
        expect(console.log).toHaveBeenCalledWith('Error: the booking being cancelled does not exist!');
        done();
    });
});

describe('', ()=> {
    var bookInputString = 'U003 2017-08-01 18:00~20:00 A';
    it("should book one did not exist", (done)=> {
        spyOn(console, "log");

        judgeInputFormat(bookInputString);
        expect(console.log).toHaveBeenCalledWith('Success: the booking is accepted!');
        done();
    });
});

describe('', ()=> {

    var bookInputString = 'U003 2017-08-02 13:00~17:00 B';
    it("should book one did not exist", (done)=> {
        spyOn(console, "log");
        judgeInputFormat(bookInputString);
        expect(console.log).toHaveBeenCalledWith('Success: the booking is accepted!');
        done();
    });
});

describe('', ()=> {
    var bookInputString = ' ';
    it("shoud print correct spaces information", (done)=> {
        var printString = `收入汇总
---
场地：A
2017-08-01 18:00~20:00 160元
2017-08-01 19:00~22:00 违约金 100元
小计：260元

场地：B
2017-08-02 13:00~17:00 200元
小计：200元

场地：C
小计：0元

场地：D
小计：0元
---
总计：460元`;
        spyOn(console, "log");
        judgeInputFormat(bookInputString);
        expect(console.log).toHaveBeenCalledWith(printString);
        done();
    })
});
