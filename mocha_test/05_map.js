var async = require('../lib');
var expect = require('chai').expect;
var assert = require('assert');

describe("map", function() {

    function mapIteratee(call_order, x, callback) {
        setTimeout(function() {
            call_order.push(x);
            callback(null, x * 2);
        }, x * 25);
    }

    it('basic', function(done) {
        var call_order = [];
        async.map([1, 3, 2], mapIteratee.bind(this, call_order), function(err, results) {
            assert(err === null, err + " passed instead of 'null'");
            expect(call_order).to.eql([1, 2, 3]);
            expect(results).to.eql([2, 6, 4]);
            done();
        });
    });

    it('map original untouched - 원본 배열은 수정되어서는 안된다.', function(done) {
        var a = [1, 2, 3];
        async.map(a, function(x, callback) {
            callback(null, x * 2);
        }, function(err, results) {
            expect(results).to.eql([2, 4, 6]);
            expect(a).to.eql([1, 2, 3]);
            done();
        });
    });

    it('map error', function(done) {
        async.map([1, 2, 3], function(x, callback) {
            callback('error');
        }, function(err) {
            expect(err).to.equal('error');
        });
        setTimeout(done, 50);
    });

    it('map undefined array - undefined가 배열 대신 들어왔을 경우, 최종 콜백에 빈 배열을 결과값으로 돌려주어야 한다.', function(done) {
        async.map(undefined, function(x, callback) {
            callback();
        }, function(err, result) {
            expect(err).to.equal(null);
            expect(result).to.eql([]);
        });
        setTimeout(done, 50);
    });

    it('map object - 객체에 대응할 수 있어야 한다.', function(done) {
        async.map({
            a: 1,
            b: 2,
            c: 3
        }, function(val, callback) {
            callback(null, val * 2);
        }, function(err, result) {
            if (err) throw err;
            expect(Object.prototype.toString.call(result)).to.equal('[object Array]');
            expect(result).to.contain(2);
            expect(result).to.contain(4);
            expect(result).to.contain(6);
            done();
        });
    });
});
