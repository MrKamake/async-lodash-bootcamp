/**
 * Returns `true` if every element in `coll` satisfies an async test. If any
 * iteratee call returns `false`, the main `callback` is immediately called.
 *
 * @param {Array} coll - A collection to iterate over.
 *
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collection in parallel.
 * The iteratee must complete with a boolean result value.
 * Invoked with (item, callback).
 *
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result will be either `true` or `false`
 * depending on the values of the async tests. Invoked with (err, result).
 *
 * async.every(['file1','file2','file3'], function(filePath, callback) {
 *.    // fs.acess는 비동기 함수라고 가정
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, result) {
 *     // if result is true then every file exists
 * });
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.

export default function every(collection, iteratee, callback) {
  let isCalled = false;
  let endChecker = 1;

  for (let i = 0; i < collection.length; i++) {
    iteratee(collection[i], (err, result) => {
      if (isCalled) {
        return;
      }

      if (err) {
        isCalled = true;
        return callback(err);
      }

      if (!result) {
        isCalled = true;
        callback(null, false);
      }

      if (endChecker === collection.length) {
        callback(null, true);
      }

      endChecker++;
    });
  }
}
