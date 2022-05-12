import { LapadiConfig, LapadiOptions } from './types';
import { App } from './resources';
declare class Lapadi {
    /**
     * Config  of lapadi
     */
    _config: LapadiConfig;
    /**
     * App  of lapadi
     */
    app: App;
    /**
     * Creates an instance of lapadi.
     * @param options
     */
    constructor(options: LapadiOptions);
}
export { Lapadi, LapadiConfig, LapadiOptions };
//# sourceMappingURL=lapadi.d.ts.map