const {mathEnforcer} = require('../thirdTask');
const expect = require('chai').expect;

describe('test mathEnforcer', function(){
    describe('addFive', function(){
        it('should return undefined when input is non-number', function(){
            expect(mathEnforcer.addFive('3')).to.equal(undefined);
        });
        it('should return 8 when input is 3', function(){
            expect(mathEnforcer.addFive(3)).to.equal(8);
        });
        it('should return 2 when input is -3', function(){
            expect(mathEnforcer.addFive(-3)).to.equal(2);
        });
        it('should return 10.1 when input is 5.1', function(){
            expect(mathEnforcer.addFive(5.1)).closeTo(10,1);
        });
    });
    describe('subtractTen', function(){
        it('should return undefined when input is non-number', function(){
            expect(mathEnforcer.subtractTen('ll')).to.equal(undefined);
        });
        it('should return -2 when input is 8', function(){
            expect(mathEnforcer.subtractTen(8)).to.equal(-2);
        });
        it('should return -13 when input is -3', function(){
            expect(mathEnforcer.subtractTen(-3)).to.equal(-13);
        });
        it('should return -9.1 when input is 0.1', function(){
            expect(mathEnforcer.subtractTen(0.1)).closeTo(-9,1);
        });
    });
    describe('sum', function(){
        it('should return undefined when first input is non-number', function(){
            expect(mathEnforcer.sum('ll', 3)).to.equal(undefined);
        });
        it('should return undefined when second input is non-number', function(){
            expect(mathEnforcer.sum(2, '1')).to.equal(undefined);
        });
        it('should return 6 when input is 8, -2', function(){
            expect(mathEnforcer.sum(8, -2)).to.equal(6);
        });
        it('should return 3 when input is -3, 6', function(){
            expect(mathEnforcer.sum(-3, 6)).to.equal(3);
        });
        it('should return -9 when input is -3, -6', function(){
            expect(mathEnforcer.sum(-3, -6)).to.equal(-9);
        });
        it('should return 0.51 when input is 0.01, 0.5', function(){
            expect(mathEnforcer.sum(0.01, 0.5)).closeTo(0,51);
        });
    });
});