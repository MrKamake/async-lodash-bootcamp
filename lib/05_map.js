/**
 * Produces a new collection of values by mapping each value in `coll` through
 * the `iteratee` function. The `iteratee` is called with an item from `coll`
 * and a callback for when it has finished processing. Each of these callback
 * takes 2 arguments: an `error`, and the transformed item from `coll`. If
 * `iteratee` passes an error to its callback, the main `callback` (for the
 * `map` function) is immediately called with the error.
 *
 * Note, that since this function applies the `iteratee` to each item in
 * parallel, there is no guarantee that the `iteratee` functions will complete
 * in order. However, the results array will be in the same order as the
 * original `coll`.
 *
 * @param {Array} coll - A collection to iterate over.
 *
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with the transformed item.
 * Invoked with (item, callback).
 *
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Results is an Array of the
 * transformed items from the `coll`. Invoked with (err, results).
 *
 * // fs.stat은 비동기 함수라고 가정
 * async.map(['file1','file2','file3'], fs.stat, function(err, results) {
 *     // results is now an array of stats for each file
 * });
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function map(collection, iteratee, callback) {
  const mapped = [];

  if (!collection) {
    return callback(null, mapped);
  }

  const collectionKeys = Object.keys(collection);
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

      if (Array.isArray(collection)) {
        mapped[i] = result;
      } else {
        mapped.push(result);
      }

      if (endChecker === collectionKeys.length) {
         callback(null, mapped);
      }

      endChecker++;
    });
  }
}
