import evaluators from './evaluators';
import { errorMissingExpect } from './utils';
// Function implementation
function configureInvert(props) {
    const { run = true, 
    // @ts-ignore
    expect: jestExpect = global.expect, } = props || {};
    if (!run)
        return jestExpect;
    if (!jestExpect)
        throw new Error(errorMissingExpect);
    // Jest's original expect function has additional method calls attached to it;
    //    therefore, we must retain references to them on the new function
    Object.setPrototypeOf(invert, expect);
    return invert;
    // -------------------------------------------------------------------------------
    // Placed as a nested function here to utilize jestExpect via closure
    function invert(actual) {
        // A map is used here instead of if statements so as to reduce
        //    the number of unnecessary code paths being checked.
        const evaluate = evaluators[typeof actual];
        const result = evaluate(actual);
        return jestExpect ? jestExpect(result) : result;
    }
}
export default configureInvert;
//# sourceMappingURL=index.js.map