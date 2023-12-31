/**
 * @param {Function} fn
 * @return {Function}
 */
function once(fn) {
    let called = false;
    let result;

    return function (...args) {
        if (!called) {
            result = fn(...args);
            called = true;
            return result;
        } else {
            return undefined;
        }
    };
}
