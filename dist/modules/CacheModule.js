"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCache = exports.Cache = void 0;
class Cache {
    constructor(config, _log) {
        this._log = _log;
        this._cache = {};
        this._groomingCache = false;
        this._lock = {};
        config = config || {};
        config.maxLength = typeof config.maxLength !== "undefined" ? config.maxLength : 1000;
        config.ttlSec = config.ttlSec || 0;
        this.config = config;
    }
    /**
     * Public method to clear the cache
     *
     * This may be used in an administrative endpoint when, for example, the database is manually
     * manipulated, or it may be used internally to clear a specific key on change.
     */
    clear(key, log) {
        if (!key) {
            this.log("notice", `Clearing all cache keys`, log);
            this._cache = {};
        }
        else {
            this.log("notice", `Clearing cache key ${key.toString()}`, log);
            if (typeof key === "string") {
                if (this._cache.hasOwnProperty(key)) {
                    this.log("debug", "String key found. Deleting value.", log);
                    delete this._cache[key];
                }
                else {
                    this.log("debug", "String key not found in cache. Not deleting anything.", log);
                }
            }
            else {
                this.log("debug", "RegExp key. Matching against all cache keys.", log);
                for (let x in this._cache) {
                    if (key.test(x)) {
                        this.log("debug", `Key matched: ${x}. Deleting value.`, log);
                        delete this._cache[x];
                    }
                }
            }
        }
    }
    get(key, q, ttlSec, log) {
        if (!q || typeof q !== "function") {
            const val = this._cache.hasOwnProperty(key) ? this._cache[key].v : undefined;
            this.log("debug", `Returning value for cache key ${key}: ${JSON.stringify(val)}`, log);
            return val;
        }
        const execCache = () => {
            if (!this._cache.hasOwnProperty(key)) {
                // Lock the cache so that we don't get multiple processes trying to set it
                this._lock[key] = true;
                this.log("info", `Cache not set for '${key}'. Getting result and caching.`, log);
                const t = Date.now();
                let ttl = ((typeof ttlSec !== "undefined" && ttlSec !== null)
                    ? ttlSec
                    : (typeof this.config.ttlSec !== "undefined" && this.config.ttlSec !== null)
                        ? this.config.ttlSec
                        : 0) * 1000;
                const timeout = ttl > 0
                    ? setTimeout(() => {
                        if (this._cache.hasOwnProperty(key)) {
                            delete this._cache[key];
                        }
                    }, ttl)
                    : null;
                try {
                    const val = q();
                    // If q returns a promise, then we have to await that
                    if (isPromise(val)) {
                        this.log("debug", `Function returned promise. Awaiting....`, log);
                        return new Promise((res, rej) => {
                            val
                                .then((v) => {
                                this.log("debug", `Got response. Setting cache and returning.`, log);
                                this.log("debug", `Returning value for cache key ${key}: ${JSON.stringify(v)}`, log);
                                this._cache[key] = { t, v, ttl: timeout };
                                this._lock[key] = false;
                                this.groomCache();
                                res(v);
                            })
                                .catch((e) => {
                                this._lock[key] = false;
                                rej(e);
                            });
                        });
                    }
                    else {
                        this.log("debug", `Function returned value. Returning immediately.`, log);
                        this.log("debug", `Returning value for cache key ${key}: ${JSON.stringify(val)}`, log);
                        this._cache[key] = { t, v: val, ttl: timeout };
                        this._lock[key] = false;
                        this.groomCache();
                        return Promise.resolve(val);
                    }
                }
                catch (e) {
                    this._lock[key] = false;
                    throw e;
                }
            }
            else {
                const val = this._cache[key].v;
                this._cache[key].t = Date.now();
                this.log("info", `Using cached value for '${key}'`, log);
                this.log("debug", `Returning value for cache key ${key}: ${JSON.stringify(val)}`, log);
                return Promise.resolve(val);
            }
        };
        if (this._lock[key]) {
            this.log("debug", `Cache locked for key ${key}. Waiting.`, log);
            return new Promise((res, rej) => {
                const wait = () => {
                    if (this._lock[key]) {
                        setTimeout(wait, 10);
                    }
                    else {
                        this.log("debug", `Cache released for key ${key}. Executing.`, log);
                        res(execCache());
                    }
                };
                wait();
            });
        }
        else {
            this.log("debug", `Cache NOT locked for key ${key}. Executing.`, log);
            return execCache();
        }
    }
    /**
     * Remove old values if cache is getting too long
     */
    groomCache() {
        return new Promise((res, rej) => {
            if (this._groomingCache) {
                res();
            }
            // Set state to "grooming"
            this._groomingCache = true;
            // Groom if necessary
            const cacheLength = Object.keys(this._cache).length;
            if (cacheLength > this.config.maxLength) {
                this.log("info", `Current cache is ${cacheLength} objects. Grooming.`);
                let kill = null;
                let oldest = Date.now();
                for (let k in this._cache) {
                    const t = this._cache[k].t;
                    if (t < oldest) {
                        oldest = t;
                        kill = k;
                    }
                }
                if (kill !== null) {
                    this.log("debug", `Destroying item at ${kill}, which was last used at ${new Date(oldest).toString()}`);
                    delete this._cache[kill];
                }
            }
            // Set state back to idle
            this._groomingCache = false;
            // Resolve the promise
            res();
        });
    }
    /**
     * Log at a given log level, if logger is available
     */
    log(level, msg, _log) {
        const log = _log || this._log;
        if (log) {
            log[level](msg);
        }
    }
}
exports.Cache = Cache;
function isPromise(obj) {
    return typeof obj.then !== "undefined";
}
/**
 * Export a mock cache for easy testing
 */
class MockCache extends Cache {
    constructor(config, log) {
        super(config || {}, log);
    }
    get(key, q, ttlSec, log) {
        if (!q || typeof q !== "function") {
            return undefined;
        }
        else {
            this.log(`debug`, `MOCK CACHE - getting fresh value`, log);
            return q();
        }
    }
}
exports.MockCache = MockCache;
