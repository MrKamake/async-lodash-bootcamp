var async = require('../lib');
var expect = require('chai').expect;
var assert = require('assert');
var db = {
    userId1: { age: 30 },
    userId2: { age: 42 },
    userId3: { age: 30 },
    findById: function(id, cb) {
        if (this.hasOwnProperty(id)) {
            return cb(null, this[id]);
        } else {
            return cb('error');
        }
    }
};

describe('groupBy', function() {

    it('groupBy', function(done) {
        async.groupBy(['userId1', 'userId2', 'userId3'], function(userId, callback) {
            db.findById(userId, function(err, user) {
                if (err) return callback(err);
                return callback(null, user.age);
            });
        },
        function(err, result){
            assert(err === null, err + " passed instead of 'null'");
            expect(result).to.eql({ 30: ['userId1', 'userId3'], 42: ['userId2']});
            done();
        });
    });

    it('groupBy empty array - 빈 객체를 리턴한다.', function(done) {
        async.groupBy([], function(x, callback) {
            callback();
        }, function(err, result){
            assert(err === null, err + " passed instead of 'null'");
            expect(result).to.eql({});
            done();
        });
    });

    it('groupBy error', function(done) {
        async.groupBy([1,2,3], function(x, callback){
            callback('error');
        }, function(err){
            expect(err).to.equal('error');
        });
        setTimeout(done, 50);
    });
});
