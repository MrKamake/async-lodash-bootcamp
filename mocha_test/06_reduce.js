var async = require('../lib');
var expect = require('chai').expect;
var assert = require('assert');

describe('reduce', function() {

    it('reduce 1', function(done) {
        var call_order = [];
        async.reduce([1,2,3], 0, function(a, x, callback){
            call_order.push(x);
            callback(null, a + x);
        }, function(err, result){
            assert(err === null, err + " passed instead of 'null'");
            expect(result).to.equal(6);
            expect(call_order).to.eql([1,2,3]);
            done();
        });
    });

    it('reduce 2', function(done) {
        var call_order = [];
        async.reduce([10,20,30], 1, function(a, x, callback){
            call_order.push(x);
            callback(null, a * x);
        }, function(err, result){
            assert(err === null, err + " passed instead of 'null'");
            expect(result).to.equal(6000);
            expect(call_order).to.eql([10,20,30]);
            done();
        });
    });

    it('reduce async', function(done) {
        async.reduce([1,3,2], 0, function(a, x, callback){
            setTimeout(function(){callback(null, a + x);}, Math.random()*100);
        }, function(err, result){
            expect(result).to.equal(6);
            done();
        });
    });

    it('reduce object', function(done) {
        async.reduce({
            a: {value: 1},
            b: {value: 2},
            c: {value: 3}
        }, 0, function(a, x, callback){
            setTimeout(function(){callback(null, a + x.value);}, Math.random()*100);
        }, function(err, result){
            expect(result).to.equal(6);
            done();
        });
    });

    it('reduce error', function(done) {
        async.reduce([1,2,3], 0, function(a, x, callback){
            callback('error');
        }, function(err){
            expect(err).to.equal('error');
        });
        setTimeout(done, 50);
    });
});
