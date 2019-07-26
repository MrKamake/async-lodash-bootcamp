/**
 * Returns a new array of all the values in `coll` which pass an async truth
 * test. This operation is performed in parallel, but the results array will be
 * in the same order as the original.
 *
 * @param {Array} coll - A collection to iterate over.
 *
 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
 * with a boolean argument once it has completed. Invoked with (item, callback).
 *
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 *
 * async.filter(['file1','file2','file3'], function(filePath, callback) {
 *.    // fs.access는 비동기 함수라고 가정
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, results) {
 *     // results now equals an array of the existing files
 * });
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function filter(collection, iteratee, callback) {
  const collectionKeys = Object.keys(collection);
  const filtered = [];
  let isCalled = false;
  let endChecker = 1;

  for (let i = 0; i < collectionKeys.length; i++) {
    iteratee(collection[collectionKeys[i]], (err, result) => {
      if (isCalled) {
        return;
      }

      if (err) {
        isCalled = true;
        return callback(err);
      }

      if (result) {
        Array.isArray(collection) ? filtered[i] = collection[i] : filtered.push(collection[collectionKeys[i]]);
      }

      if (endChecker === collectionKeys.length) {
        callback(null, filtered);
      }

      endChecker++;
    });
  }
}
