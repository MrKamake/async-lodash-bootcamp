var async = require('../lib');
var expect = require('chai').expect;
var count = 0;

describe("forever", function () {

    it('forever', function(done){
        async.forever(
            function(next) {
                // next is suitable for passing to things that need a callback(err [, whatever]);
                // it will result in this function being called again.
                count++;
                setTimeout(function() {
                    if (count > 5) {
                        next('error');
                    } else {
                        next();
                    }
                }, 10);
            },
            function(err) {
                // if next is called with a value in its first parameter, it will appear
                // in here as 'err', and execution will stop.
                expect(err).to.equal('error');
                done();
            }
        );
    });

});
