var assert = require('assert');
let convert = require('../app')

describe('Temperature Conversion', ()=>{
    
    describe('cToF', ()=>{
        it('should convert -40 celsius to -40 fahrenheit',()=>{
            assert.equal(-40,convert.cToF(-40))
        })
    
        it('should convert 0 celsius to 32 fahrenheit', ()=>{
            assert.equal(32, convert.cToF(0))
        })
        
        it('should return undefined if no temperature is input', function () {
            assert.equal(undefined, convert.cToF(''));
        });
    });

    describe('fToC', ()=>{
        it('should convert -40 fahrenheit to -40 celsius', function () {
            assert.equal(-40, convert.fToC(-40));
        });
        it('should convert 32 fahrenheit to 0 celsius', function () {
            assert.equal(0, convert.fToC(32));
        });
        it('should return undefined if no temperature is input', function () {
            assert.equal(undefined, convert.fToC(''));
        });
    })
        
})