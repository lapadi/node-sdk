import { LapadiConfig, LapadiOptions } from './types';
import { App, Auth } from './resources';
declare class Lapadi {
    /**
     * Config  of lapadi
     */
    _config: LapadiConfig;
    /**
     * App  of lapadi
     */
    app: App;
    auth: Auth;
    /**
     * Creates an instance of lapadi.
     * @param options
     */
    constructor(options: LapadiOptions);
}
export { Lapadi, LapadiConfig, LapadiOptions };
//# sourceMappingURL=lapadi.d.ts.map