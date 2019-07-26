/**
 * Returns the first value in coll that passes an async truth test.
 * The iteratee is applied in parallel, meaning the first iteratee to return true will fire the detect callback with that result.
 * That means the result might not be the first item in the original coll (in terms of order) that passes the test.
 * If order within the original coll is important, then look at detectSeries.
 *
 * @param {Array} coll - A collection to iterate over.
 *
 * @param {AsyncFunction} iteratee - A truth test to apply to each item in coll.
 * The iteratee must complete with a boolean value as its result.
 * Invoked with (item, callback).
 *
 * @param {Function} [callback] - A callback which is called as soon as any iteratee returns true, or after all the iteratee functions have finished.
 * Result will be the first item in the array that passes the truth test (iteratee) or the value undefined if none passed. Invoked with (err, result).
 *
 * async.detect(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, result) {
 *     // result now equals the first file in the list that exists
 * });
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function detect(collection, iteratee, callback) {
  const collectionKeys = Object.keys(collection);
  let isCalled = false;

  for (let i = 0; i < collectionKeys.length; i++) {
    iteratee(collection[collectionKeys[i]], (error, result) => {
      if (isCalled) {
        return;
      }

      if (error) {
        isCalled = true;
        callback(error);
      }

      if (i + 1 === collectionKeys.length) {
        if (!result) {
          callback(null, undefined);
        }

        callback(null, collection[collectionKeys[i]]);
      }
    });
  }
}
