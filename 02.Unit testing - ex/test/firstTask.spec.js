const isOddOrEven = require('../firstTask');
const expect = require('chai').expect;

describe('test fn isOddOrEven', function(){
    it('should return undefined when input is not string', function(){
        expect(isOddOrEven(5)).to.equal(undefined);
    });
    it('should return even when input is string with even length', function(){
        expect(isOddOrEven('aaaa')).to.equal('even');
    });
    it('should return odd when input is string with odd length', function(){
        expect(isOddOrEven('aaa')).to.equal('odd');
    });
});