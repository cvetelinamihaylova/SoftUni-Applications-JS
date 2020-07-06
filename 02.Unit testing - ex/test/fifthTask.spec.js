const PaymentPackage = require('../fifthTask');
const expect = require('chai').expect;

describe('test PaymentPackage', function(){
       let newInstance;
        beforeEach(function(){
            newInstance = new PaymentPackage('Consultation', 800)
        });
    describe('test instance', function () {
        it('should return instance of class', function () {
            expect(newInstance).instanceOf(PaymentPackage);
        });
        it('should return value of name property(\'Consultation\')', function () {
            expect(newInstance.name).to.equal('Consultation');
        });
        it('should return value of value property(800)', function () {
            expect(newInstance.value).to.equal(800);
        });
        it('should throw error if name param is not string', function () {
            expect(()=>new PaymentPackage(null, 800) ).throw(Error, 'Name must be a non-empty string');
            expect(()=>new PaymentPackage(5, 800) ).throw(Error, 'Name must be a non-empty string');
        });
        it('should throw error if name param is empty string', function () {
            expect(()=>new PaymentPackage('', 800) ).throw(Error, 'Name must be a non-empty string');
        });
        it('should throw error if value param is non-number', function () {
            expect(()=>new PaymentPackage('HR', []) ).throw(Error, 'Value must be a non-negative number');
            expect(()=>new PaymentPackage('HR', 'test') ).throw(Error, 'Value must be a non-negative number');
        });
        it('should throw error if value param is negative number', function () {
            expect(()=>new PaymentPackage('HR', -5) ).throw(Error, 'Value must be a non-negative number');
            expect(()=>new PaymentPackage('HR', -5.5) ).throw(Error, 'Value must be a non-negative number');
        });
        it('should have property name', function () {
            expect(newInstance).to.have.property('name');
        });
        it('should have property value', function () {
            expect(newInstance).to.have.property('value');
        });
        it('should have property VAT', function () {
            expect(newInstance).to.have.property('VAT');
        });
        it('should have property active', function () {
            expect(newInstance).to.have.property('active');
        });
    });
    describe('test accessors', function(){
       
        it('should return default value of VAT', function () {
            expect(newInstance.VAT).to.equal(20)
        });
        it('should set correct newValue of VAT(non-negative number)', function () {
            newInstance.VAT = 50;
            expect(newInstance.VAT).to.equal(50)
        });
        it('should throw error if VAT param is not correct', function () {
            expect(()=>newInstance.VAT = null ).throw(Error, 'VAT must be a non-negative number');
            expect(()=>newInstance.VAT = -5 ).throw(Error, 'VAT must be a non-negative number');
        });
        it('should return default value of active', function () {
            expect(newInstance.active).to.equal(true)
        });
        it('should set correct newValue of VAT(boolean)', function () {
            newInstance.active = false;
            expect(newInstance.active).to.equal(false)
        });
        it('should throw error if VAT param is non-boolean', function () {
            expect(()=>newInstance.active = null ).throw(Error, 'Active status must be a boolean');
            expect(()=>newInstance.active = -5 ).throw(Error, 'Active status must be a boolean');
        });
       
    });
    describe('test toString fn', function(){

        it('should return correct result when active is true', function(){
            const result = [
                `Package: Consultation`,
                `- Value (excl. VAT): 800`,
                `- Value (VAT 20%): 960`
              ].join('\n')
              expect(newInstance.toString()).to.equal(result);
          
        });
        it('should return correct result when active is false', function(){
            newInstance.active = false;
            newInstance.value = 320;
            newInstance.VAT = 10;

            const result = [
                `Package: Consultation (inactive)`,
                `- Value (excl. VAT): 320`,
                `- Value (VAT 10%): 352`
              ].join('\n')
              expect(newInstance.toString()).to.equal(result);
          
        });
    });
})