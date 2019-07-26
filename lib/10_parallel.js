/**
 * Run the `tasks` collection of functions in parallel, without waiting until
 * the previous function has completed. If any of the functions pass an error to
 * its callback, the main `callback` is immediately called with the value of the
 * error. Once the `tasks` have completed, the results are passed to the final
 * `callback` as an array.
 *
 * @param {Array} tasks - A collection of
 * [async functions]{@link AsyncFunction} to run.
 * Each async function can complete with any number of optional `result` values.
 *
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed successfully. This function gets a results array
 * (or object) containing all the result arguments passed to the task callbacks.
 * Invoked with (err, results).
 *
 * async.parallel([
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     // the results array will equal ['one','two'] even though
 *     // the second function had a shorter timeout.
 * });
 *
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function parallel(collection, callback) {
  const collectionKeys = Object.keys(collection);
  const parallelResultArr = [];
  const parallelResultObj = {};
  let isCalled = false;
  let endChecker = 1;

  if (!collection[collectionKeys[0]]) {
    Array.isArray(collection) ? callback(null, parallelResultArr) : callback(null, parallelResultObj);
  }

  for (let i = 0; i < collectionKeys.length; i++) {
    collection[collectionKeys[i]]((err, ...result) => {
      if (isCalled) {
        return;
      }

      if (err) {
        isCalled = true;
        return callback(err);
      }

      if (Array.isArray(collection)) {
        ([...result].length === 1) ? parallelResultArr[i] = (result[0]) : parallelResultArr[i] = [...result];
      } else {
        ([...result].length === 1) ? parallelResultObj[collectionKeys[i]] = result[0] : parallelResultObj[collectionKeys[i]] = [...result];
      }

      if (endChecker === collectionKeys.length) {
        Array.isArray(collection) ? callback(null, parallelResultArr) : callback(null, parallelResultObj);
      }

      endChecker++;
    });
  }
}
