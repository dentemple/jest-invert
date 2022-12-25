import type { ConfigureInvertProps, JestInvert, JestGlobalExpect } from './@types';
declare global {
    namespace NodeJS {
        interface Global {
            expect: JestGlobalExpect;
        }
    }
}
declare function configureInvert(props?: ConfigureInvertProps): JestInvert | JestGlobalExpect | undefined;
export default configureInvert;
