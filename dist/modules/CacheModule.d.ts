declare type CacheConfig = {
    maxLength: number;
    ttlSec: number;
};
declare type Timeout = any;
export interface CacheInterface {
    clear(key?: string | RegExp, log?: any): void;
    get<T>(key: string, log?: any): T | undefined;
    get<T>(key: string, q: (() => T) | (() => Promise<T>), ttlSec?: number, log?: any): Promise<T>;
}
export declare class Cache implements CacheInterface {
    protected _log?: any;
    protected config: CacheConfig;
    protected _cache: {
        [queryKey: string]: {
            t: number;
            v: unknown;
            ttl: Timeout | null;
        };
    };
    private _groomingCache;
    private _lock;
    constructor(config: Partial<CacheConfig>, _log?: any);
    /**
     * Public method to clear the cache
     *
     * This may be used in an administrative endpoint when, for example, the database is manually
     * manipulated, or it may be used internally to clear a specific key on change.
     */
    clear(key?: string | RegExp, log?: any): void;
    /**
     * Return the value stored at the given key, or execute the given query, storing its return
     * value at the given key if not already set.
     */
    get<T>(key: string, log?: any): T | undefined;
    get<T>(key: string, q: (() => T) | (() => Promise<T>), ttlSec?: number, log?: any): Promise<T>;
    /**
     * Remove old values if cache is getting too long
     */
    protected groomCache(): Promise<void>;
    /**
     * Log at a given log level, if logger is available
     */
    protected log(level: keyof any, msg: string, _log?: any | undefined): void;
}
/**
 * Export a mock cache for easy testing
 */
export declare class MockCache extends Cache {
    constructor(config?: Partial<CacheConfig>, log?: any);
    get<T>(key: string, log?: any): T | undefined;
    get<T>(key: string, q: (() => T) | (() => Promise<T>), ttlSec?: number, log?: any): Promise<T>;
}
export {};
