/**
 * Reduces `coll` into a single value using an async `iteratee` to return each
 * successive step. `memo` is the initial state of the reduction. This function
 * only operates in series.
 *
 * @param {Array} coll - A collection to iterate over.
 *
 * @param {*} memo - The initial state of the reduction.
 *
 * @param {AsyncFunction} iteratee - A function applied to each item in the
 * array to produce the next step in the reduction.
 * The `iteratee` should complete with the next state of the reduction.
 * If the iteratee complete with an error, the reduction is stopped and the
 * main `callback` is immediately called with the error.
 * Invoked with (memo, item, callback).
 *
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result is the reduced value. Invoked with
 * (err, result).
 *
 * async.reduce([1,2,3], 0, function(memo, item, callback) {
 *     // 비동기 처리
 *     setTimeout(function() {
 *         callback(null, memo + item)
 *     }, 1000);
 * }, function(err, result) {
 *     // result is now equal to the last value of memo, which is 6
 * });
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function reduce(collection, accumulator, iteratee, callback) {
  const copiedCollection = collection;
  const collectionKeys = Object.keys(copiedCollection);
  let isCalled = false;

  if (!copiedCollection[collectionKeys[0]]) {
    return callback(null, accumulator);
  }

  iteratee(accumulator, copiedCollection[collectionKeys[0]], (err, result) => {
    if (isCalled) {
      return;
    }

    if (err) {
      isCalled = true;
      return callback(err);
    }

    if (Array.isArray(collection)) {
      copiedCollection.splice(0, 1);
      reduce(copiedCollection, result, iteratee, callback);
    } else {
      delete copiedCollection[collectionKeys[0]];
      reduce(collection, result, iteratee, callback);
    }
  });
}
