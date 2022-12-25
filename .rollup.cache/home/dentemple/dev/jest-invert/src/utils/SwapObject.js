export const SwapObject = (actual) => {
    let swapped = {};
    Object.keys(actual).forEach((key) => {
        swapped[JSON.stringify(actual[key])] = key;
    });
    return swapped;
};
export default SwapObject;
//# sourceMappingURL=SwapObject.js.map