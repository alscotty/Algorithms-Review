var assert = require('assert');
let Fib = require('../class.js');

describe('Fib Class', ()=>{
    let app = new Fib();

    describe('#findNthFib', ()=>{
        it('should return null for negative inputs',()=>{
            assert.equal(null, app.findNthFib(-3))
        });

        it('should return 1 for 1',()=>{
           assert.equal(1, app.findNthFib(1)) 
        });
      
        it('should return 8 for 5',()=>{
           assert.equal(8, app.findNthFib(5)) 
        });
      
        it('should return 11 for 6',()=>{
           assert.equal(13, app.findNthFib(6)) 
        });

    });

});
