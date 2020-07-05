const mod = require('../tasks');
const expect = require('chai').expect;

describe('tests of the tasks', function () {
    describe('test sum fn', function () {
        it('should return NaN, when arg is a string', function () {
            const arg = 'test';
            const result = mod.sum(arg);
            expect(result).to.be.NaN;
        });
        it('should return 3, when arg is a [1, 2]', function () {
            const arg = [1, 2];
            const result = mod.sum(arg);
            expect(result).to.equal(3);
        });
        it('should return 3, when arg is a ["1", "2"]', function () {
            const arg = ["1", "2"];
            const result = mod.sum(arg);
            expect(result).to.equal(3);
        });
        it('should return NaN, when arg is invalid number arr', function () {
            const arg = [1, 'ggg', 3];
            const result = mod.sum(arg);
            expect(result).to.be.NaN;
        });
    });

    describe('test symmetric fn', function () {

        it('string input should not be symmetric', function () {
            const arg = 'ffff';
            const result = mod.isSymmetric(arg);
            expect(result).to.equal(false);
        });
        it('number input should not be symmetric', function () {
            const arg = 5;
            const result = mod.isSymmetric(arg);
            expect(result).to.equal(false);
        });
        it('object input should not be symmetric', function () {
            const arg = { num: 5 };
            const result = mod.isSymmetric(arg);
            expect(result).to.equal(false);
        });
        it('should return false, when arg is [1, 2, 3]', function () {
            const arg = [1, 2, 3];
            const result = mod.isSymmetric(arg);
            expect(result).to.equal(false);
        });
        it('should return true, when arg is [1, 1, 1]', function () {
            const arg = [1, 1, 1];
            const result = mod.isSymmetric(arg);
            expect(result).to.equal(true);
        });
    });
    describe('test rgbToHexColor fn', function (){
        it('should return undefined first input parameters is not number', function () {
            const arg = ['gh', 5, 5] ;
            const result = mod.rgbToHexColor(...arg);
            expect(result).to.equal(undefined);
        });
        it('should return undefined second input parameters is not number', function () {
            const arg = [5, '5', 5] ;
            const result = mod.rgbToHexColor(...arg);
            expect(result).to.equal(undefined);
        });
        it('should return undefined third input parameters is not number', function () {
            const arg = [5, 5, 'ff'] ;
            const result = mod.rgbToHexColor(...arg);
            expect(result).to.equal(undefined);
        });
        it('should return undefined first input parameters is not in the expected range', function () {
            const arg = [-1, 5, 5] ;
            const result = mod.rgbToHexColor(...arg);
            expect(result).to.equal(undefined);
        });
        it('should return undefined second input parameters is not in the expected range', function () {
            const arg = [1, 256, 5] ;
            const result = mod.rgbToHexColor(...arg);
            expect(result).to.equal(undefined);
        });
        it('should return undefined second input parameters is not in the expected range', function () {
            const arg = [1, 255, -5] ;
            const result = mod.rgbToHexColor(...arg);
            expect(result).to.equal(undefined);
        });
        it('should return #01FF05, when input is correct', function () {
            const arg = [1, 255, 5] ;
            const result = mod.rgbToHexColor(...arg);
            expect(result).to.equal('#01FF05');
        });
        it('should return #64ff05, when input is correct and use toLowerCase()', function () {
            const arg = [100, 255, 5] ;
            const result = mod.rgbToHexColor(...arg).toLowerCase();
            expect(result).to.equal('#64ff05');
        });
    });
    describe('test createCalculator fn', function(){
        it('should return NaN when arg to addFn is not number', function () {
            const calc=  mod.createCalculator()
            const arg = 'fff';
            calc.add(arg);
            expect(calc.get()).to.be.NaN;
        });
        it('should return 5 when arg to addFn is a string number', function () {
            const calc=  mod.createCalculator()
            const arg = '5';
            calc.add(arg);
            expect(calc.get()).to.equal(5);
        });
        it('should return NaN when arg to subtractFn is not number', function () {
            const calc=  mod.createCalculator()
            const arg = 'fff';
            calc.subtract(arg);
            expect(calc.get()).to.be.NaN;
        });
        it('should return -5 when arg to subtractFn is a string number', function () {
            const calc=  mod.createCalculator()
            const arg = '5';
            calc.subtract(arg);
            expect(calc.get()).to.equal(-5);
        });
        it('should return 10 when add and subtract correct inputs', function () {
            const calc=  mod.createCalculator()
            calc.add(10);
            calc.add(2);
            calc.subtract(2);
            expect(calc.get()).to.equal(10);
        });
    });
})
