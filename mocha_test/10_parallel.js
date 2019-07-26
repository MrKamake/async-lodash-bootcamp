var async = require('../lib');
var expect = require('chai').expect;
var assert = require('assert');

describe('parallel', function() {

    it('parallel', function(done) {
        var call_order = [];
        async.parallel([
            function(callback){
                setTimeout(function(){
                    call_order.push(1);
                    callback(null, 1);
                }, 50);
            },
            function(callback){
                setTimeout(function(){
                    call_order.push(2);
                    callback(null, 2);
                }, 100);
            },
            function(callback){
                setTimeout(function(){
                    call_order.push(3);
                    callback(null, 3,3);
                }, 25);
            }
        ],
        function(err, results){
            assert(err === null, err + " passed instead of 'null'");
            expect(call_order).to.eql([3,1,2]);
            expect(results).to.eql([1,2,[3,3]]);
            done();
        });
    });

    it('parallel object - 객체에 대응할 수 있어야 한다.', function(done) {
        var call_order = [];
        async.parallel({
            one: function(callback) {
                setTimeout(function() {
                    call_order.push(1);
                    callback(null, 1);
                }, 200);
            },
            two: function(callback) {
                setTimeout(function() {
                    call_order.push(2);
                    callback(null, 2);
                }, 100);
            }
        },
        function(err, results){
            assert(err === null, err + " passed instead of 'null'");
            expect(call_order).to.eql([2,1]);
            expect(results).to.eql({one: 1, two: 2});
            done();
        });
    });

    it('parallel empty array', function(done) {
        async.parallel([], function(err, results){
            assert(err === null, err + " passed instead of 'null'");
            expect(results).to.eql([]);
            done();
        });
    });

    it('parallel empty object', function(done) {
        async.parallel({}, function(err, results){
            assert(err === null, err + " passed instead of 'null'");
            expect(results).to.eql({});
            done();
        });
    });

    it('parallel error', function(done) {
        async.parallel([
            function(callback){
                callback('error', 1);
            },
            function(callback){
                callback('error2', 2);
            }
        ],
        function(err){
            expect(err).to.equal('error');
        });
        setTimeout(done, 100);
    });
});
