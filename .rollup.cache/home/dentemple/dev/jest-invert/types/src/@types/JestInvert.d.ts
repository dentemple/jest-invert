import type { JestGlobalExpect } from './JestGlobalExpect';
export interface JestInvert extends JestGlobalExpect {
    (actual: undefined): boolean;
    (actual: null): boolean;
    (actual: boolean): boolean;
    (actual: number): number;
    (actual: string): string;
    (actual: symbol): symbol;
    (actual: Array<any>): Array<any>;
    (actual: Object[]): Object[];
    (actual: Function): Function;
}
export default JestInvert;
