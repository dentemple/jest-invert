export function invertFunction(actual) {
    // Note: The function name is important here; it'll show up in the end user's test results
    return function inverted() {
        return actual;
    };
}
export default invertFunction;
//# sourceMappingURL=invertFunction.js.map