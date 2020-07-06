const lookupChar = require('../secondTask');
const expect = require('chai').expect;

describe('test fn lookupChar', function(){
    it('should return undefined when first input is not string', function(){
        expect(lookupChar([], 1)).to.equal(undefined)
    });
    it('should return undefined when second input is not int', function(){
        expect(lookupChar('express', 1.1)).to.equal(undefined)
    });
    it('should return undefined when second input is not number', function(){
        expect(lookupChar('express', 'p')).to.equal(undefined)
    });
    it('should return Incorrect index when second input is not in range', function(){
        expect(lookupChar('express', 7)).to.equal('Incorrect index');
        expect(lookupChar('express', -1)).to.equal('Incorrect index');
    });
    it('should return "p" when inputs are correct', function(){
        expect(lookupChar('express', 2)).to.equal('p');
    });
   
});