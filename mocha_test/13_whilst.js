var async = require('../lib');
var expect = require('chai').expect;
var count = 0;

describe("whilst", function () {
    this.timeout(10000);

    it('basics', function(done){
        async.whilst(
            function() { return count < 5; },
            function(callback) {
                count++;
                setTimeout(function() {
                    callback(null, count);
                }, 10);
            },
            function (err, n) {
                expect(err === null, err + " passed instead of 'null'");
                expect(n).to.eql(5);
                done();
            }
        );
    });

    it('error', function(done){
        async.whilst(
            function() { return true; },
            function(callback) {
                count++;
                setTimeout(function() { if (count > 3) callback('error'); }, 0);
            },
            function(err){
                expect(err).to.equal('error');
                done();
            }
        );
    });

});
