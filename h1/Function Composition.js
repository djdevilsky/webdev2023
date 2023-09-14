/**
 * @param {Function[]} functions
 * @return {Function}
 */
function compose(functions) {
    if (functions.length === 0) {
        // If the array is empty, return the identity function.
        return function(x) {
            return x;
        };
    }

    return function(x) {
        let result = x;
        for (let i = functions.length - 1; i >= 0; i--) {
            result = functionsi;
        }
        return result;
    };
}
