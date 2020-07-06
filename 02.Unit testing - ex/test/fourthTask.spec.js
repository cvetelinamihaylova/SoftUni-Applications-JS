const StringBuilder = require('../fourthTask');
const expect = require('chai').expect;

describe('test class StringBuilder', function () {
    describe('test instance with a passed in string', function () {
        it('should return instance of class', function () {
            const newInstance = new StringBuilder();
            expect(newInstance).instanceOf(StringBuilder);
        });
        it('should throw error if param is not string', function () {
            expect(() => new StringBuilder(5)).to.throw(TypeError, 'Argument must be string');
        });
    });
    describe('test append fn', function () {
        it('should append string to empty storage', function () {
            const newInstance = new StringBuilder();
            newInstance.append('two');
            const storage = newInstance._stringArray
            expect(storage).to.eql(['t', 'w', 'o']);
        });
        it('should append string to non-storage', function () {
            const newInstance = new StringBuilder('cat');
            newInstance.append('two');
            const storage = newInstance._stringArray
            expect(storage).to.eql(['c', 'a', 't', 't', 'w', 'o']);
        });
        it('should throw error if param is not string', function () {
            const newInstance = new StringBuilder('cat');
            expect(() => newInstance.append(5)).to.throw(TypeError, 'Argument must be string');
        });
    });
    describe('test prepend fn', function () {
        it('should prepend string to empty storage', function () {
            const newInstance = new StringBuilder();
            newInstance.prepend('two');
            const storage = newInstance._stringArray
            expect(storage).to.eql(['t', 'w', 'o']);
        });
        it('should prepend string to non-storage', function () {
            const newInstance = new StringBuilder('cat');
            newInstance.prepend('two');
            const storage = newInstance._stringArray
            expect(storage).to.eql(['t', 'w', 'o', 'c', 'a', 't']);
        });
        it('should throw error if param is not string', function () {
            const newInstance = new StringBuilder('cat');
            expect(() => newInstance.prepend(5)).to.throw(TypeError, 'Argument must be string');
        });
    });

    describe('test insertAt fn', function () {
        it('should insert string specific index to storage', function () {
            const newInstance = new StringBuilder('cat');
            newInstance.insertAt('two', 1);
            const storage = newInstance._stringArray
            expect(storage).to.eql(['c', 't', 'w', 'o', 'a', 't']);
        });
        it('should throw error if param is not string', function () {
            const newInstance = new StringBuilder('cat');
            expect(() => newInstance.insertAt(5)).to.throw(TypeError, 'Argument must be string');
        });
    });
    describe('test remove fn', function () {
        it('should remove string from storage', function () {
            const newInstance = new StringBuilder('kittens');
            newInstance.remove(1, 2);
            const storage = newInstance._stringArray
            expect(storage).to.eql(["k", "t", "e", "n", "s"]);
        });
    });

    describe('test toString fn', function () {
        it('should return joined string ', function () {
            const newInstance = new StringBuilder('cat');
            newInstance.append('two');
            expect(newInstance.toString()).to.equal('cattwo');
        });
    });
})