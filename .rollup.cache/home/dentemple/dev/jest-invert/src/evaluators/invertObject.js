import { invertArray } from './invertArray';
import { invertEmpty } from './invertEmpty';
import { SwapObject } from '../utils';
// Function implementation
export function invertObject(actual) {
    if (null === actual)
        return invertEmpty(actual);
    if (Array.isArray(actual))
        return invertArray(actual);
    return SwapObject(actual);
}
export default invertObject;
//# sourceMappingURL=invertObject.js.map