import invertBoolean from './invertBoolean';
import invertEmpty from './invertEmpty';
import invertFunction from './invertFunction';
import invertNumber from './invertNumber';
import invertObject from './invertObject';
import invertString from './invertString';
import doNothing from './doNothing';
export { invertBoolean, invertEmpty, invertFunction, invertNumber, invertObject, invertString, doNothing, };
export declare const evaluators: {
    bigint: (actual: number) => number;
    boolean: (actual: boolean) => boolean;
    function: typeof invertFunction;
    number: (actual: number) => number;
    object: typeof invertObject;
    string: (actual: string) => string;
    symbol: (actual: any) => any;
    undefined: (actual: null | undefined) => true;
};
export default evaluators;
