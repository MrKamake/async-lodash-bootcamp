var async = require('../lib');
var expect = require('chai').expect;

function detectIteratee(x, callback) {
    setTimeout(function(){
        callback(null, x % 2);
    }, (10 - x) * 10);
}

describe("detect", function () {

    it('detect - truth 테스트를 통과한 첫번째 값만 즉시 반환한다.', function(done){
        async.detect([1,2,5], detectIteratee, function(err, results){
            expect(err).to.equal(null);
            expect(results).to.eql(5);
            done();
        });
    });

    it('detect object - 객체에 대응할 수 있어야 한다.', function(done){
        async.detect({
            a: 1,
            b: 2,
            c: 5
        }, detectIteratee, function(err, results){
            expect(err).to.equal(null);
            expect(results).to.eql(5);
            done();
        });
    });

    it('detect undefined - 찾는 값이 없으면 끝까지 iterate하고 undefined를 반환한다.', function(done){
        async.detect([2,4,6], detectIteratee, function(err, results){
            expect(err).to.equal(null);
            expect(results).to.eql(undefined);
            done();
        });
    });

    it('detect error', function(done){
        async.detect([3,1,2], function(x, callback){
            callback('error');
        } , function(err, results){
            expect(err).to.equal('error');
            expect(results).to.not.exist;
            done();
        });
    });
});
