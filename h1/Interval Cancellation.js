/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function(fn, args, t) {
    const intervalId = setInterval(() => {
        fn(...args);
    }, t);

    const cancelFn = function() {
        clearInterval(intervalId);
    };

    fn(...args); // Call the function immediately

    return cancelFn;
};
