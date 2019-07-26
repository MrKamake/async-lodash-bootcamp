var async = require('../lib');
var expect = require('chai').expect;
var assert = require('assert');

describe("waterfall", function () {

    it('basics', function(done){
        var call_order = [];
        async.waterfall([
            function(callback){
                call_order.push('fn1');
                setTimeout(function(){callback(null, 'one', 'two');}, 0);
            },
            function(arg1, arg2, callback){
                call_order.push('fn2');
                expect(arg1).to.equal('one');
                expect(arg2).to.equal('two');
                setTimeout(function(){callback(null, arg1, arg2, 'three');}, 25);
            },
            function(arg1, arg2, arg3, callback){
                call_order.push('fn3');
                expect(arg1).to.equal('one');
                expect(arg2).to.equal('two');
                expect(arg3).to.equal('three');
                callback(null, 'four');
            },
            function(arg4, callback){
                call_order.push('fn4');
                callback(null, 'test');
            }
        ], function(err){
            expect(err === null, err + " passed instead of 'null'");
            expect(call_order).to.eql(['fn1','fn2','fn3','fn4']);
            done();
        });
    });

    it('empty array', function(done){
        async.waterfall([], function(err){
            if (err) throw err;
            done();
        });
    });

    it('error', function(done){
        async.waterfall([
            function(callback){
                callback('error');
            },
            function(callback){
                assert(false, 'next function should not be called');
                callback();
            }
        ], function(err){
            expect(err).to.equal('error');
            done();
        });
    });
});
