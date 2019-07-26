var async = require('../lib');
var expect = require('chai').expect;
var assert = require('assert');

describe('series', function() {
    it('series', function(done) {
        var call_order = [];
        async.series([
            function(callback){
                setTimeout(function(){
                    call_order.push(1);
                    callback(null, 1);
                }, 25);
            },
            function(callback){
                setTimeout(function(){
                    call_order.push(2);
                    callback(null, 2);
                }, 50);
            },
            function(callback){
                setTimeout(function(){
                    call_order.push(3);
                    callback(null, 3,3);
                }, 15);
            }
        ],
        function(err, results){
            assert(err === null, err + " passed instead of 'null'");
            expect(results).to.eql([1,2,[3,3]]);
            expect(call_order).to.eql([1,2,3]);
            done();
        });
    });

    it('series object', function(done) {
        var call_order = [];
        async.series({
            one: function(callback) {
                setTimeout(function() {
                    call_order.push(1);
                    callback(null, 1);
                }, 200);
            },
            two: function(callback){
                setTimeout(function() {
                    call_order.push(2);
                    callback(null, 2);
                }, 100);
            }
        },
        function(err, results){
            assert(err === null, err + " passed instead of 'null'");
            expect(results).to.eql({one: 1, two: 2});
            expect(call_order).to.eql([1,2]);
            done();
        });
    });

    it('empty array', function(done) {
        async.series([], function(err, results){
            expect(err).to.equal(null);
            expect(results).to.eql([]);
            done();
        });
    });

    it('error', function(done) {
        async.series([
            function(callback){
                callback('error', 1);
            },
            function(callback){
                assert(false, 'should not be called');
                callback('error2', 2);
            }
        ],
        function(err){
            expect(err).to.equal('error');
        });
        setTimeout(done, 100);
    });
});
