/// <reference types="node" />
import { Agent } from 'http';
export declare type LatestApiVersion = '2020-08-27';
export declare type HttpAgent = Agent;
export declare type HttpProtocol = 'http' | 'https';
export interface LapadiConfig extends LapadiOptions {
    api_endpoint?: string;
    app: SelectApp;
    api: SelectApi;
}
export interface LapadiOptions {
    /**
     * This library's types only reflect the latest API version.
     *
     * We recommend upgrading your account's API Version to the latest version
     * if you wish to use TypeScript with this library.
     *
     * If you wish to remain on your account's default API version,
     * you may pass `null` or another version instead of the latest version,
     * and add a `@ts-ignore` comment here and anywhere the types differ between API versions.
     *
     * @docs https://lapadi.com/docs/api/versioning
     */
    apiVersion: LatestApiVersion;
    /**
     * Optionally indicate that you are using TypeScript.
     * This currently has no runtime effect other than adding "TypeScript" to your user-agent.
     */
    typescript?: true;
    /**
     * Enables automatic network retries with exponential backoff, up to the specified number of retries (default 0).
     * Idempotency keys](https://lapadi.com/docs/api/idempotent_requests) are added where appropriate to prevent duplication.
     * @docs https://github.com/lapadi/lapadi-node#network-retries
     */
    maxNetworkRetries?: number;
    /**
     * Use a custom http(s) agent.
     * Useful for making requests through a proxy.
     */
    httpAgent?: HttpAgent;
    /**
     * Use a custom http client, rather than relying on Node libraries.
     * Useful for making requests in contexts other than NodeJS (eg. using
     * `fetch`).
     */
    /**
     * Request timeout in milliseconds.
     * The default is 80000
     */
    timeout?: number;
    host?: string;
    port?: string | number;
    protocol?: HttpProtocol;
    /**
     * Pass `telemetry: false` to disable headers that provide Lapadi
     * with data about usage of the API.
     * Currently, the only telemetry we send is latency metrics.
     */
    telemetry?: boolean;
    /**
     * For plugin authors to identify their code.
     * @docs https://lapadi.com/docs/building-plugins?lang=node#setappinfo
     */
    /**
     * An account id on whose behalf you wish to make every request.
     */
    lapadiAccount?: string;
    api: SelectApi;
    app: SelectApp;
}
export interface SelectApi {
    protocol?: string;
    host?: string;
    port?: number;
    version?: string;
}
export interface SelectApp {
    id?: string;
    slug?: string;
    token: string;
}
export interface LoginData {
    email: string;
    password: string;
}
export interface LoginData {
    email: string;
    password: string;
}
export interface RegisterData {
    name: string;
    surname: string;
    gender: string;
    phone: string;
    email: string;
    password: string;
}
export interface AppRegisterData {
    name: string;
    surname: string;
    gender: string;
    phone: string;
    email: string;
    password: string;
}
export interface RequestOptions {
    /**
     * Use a specific API Key for this request.
     * For Connect, we recommend using `lapadiAccount` instead.
     */
    apiKey?: string;
    /** @deprecated Please use apiKey instead. */
    api_key?: string;
    /**
     * See the [idempotency key docs](https://lapadi.com/docs/api/idempotent_requests).
     */
    idempotencyKey?: string;
    /** @deprecated Please use idempotencyKey instead. */
    idempotency_key?: string;
    /**
     * An account id on whose behalf you wish to make a request.
     */
    lapadiAccount?: string;
    /** @deprecated Please use lapadiAccount instead. */
    lapadi_account?: string;
    /**
     * The [API Version](https://lapadi.com/docs/upgrades) to use for a given request (e.g., '2020-03-02').
     */
    apiVersion?: string;
    /** @deprecated Please use apiVersion instead. */
    lapadiVersion?: string;
    /** @deprecated Please use lapadiVersion instead. */
    lapadi_version?: string;
    /**
     * Specify the number of requests to retry in event of error.
     * This overrides a default set on the Lapadi object's config argument.
     */
    maxNetworkRetries?: number;
    /**
     * Specify a timeout for this request in milliseconds.
     */
    timeout?: number;
}
export interface ApiSearchResult<T> {
    object: 'search_result';
    data: Array<T>;
    /**
     * True if this list has another page of items after this one that can be fetched.
     */
    has_more: boolean;
    /**
     * The URL where this list can be accessed.
     */
    url: string;
    /**
     * The page token to use to get the next page of results. If `has_more` is
     * true, this will be set to a concrete string value.
     */
    next_page: string | null;
    /**
     * The total number of search results. Only present when `expand` request
     * parameter contains `total_count`.
     */
    total_count?: number;
}
export declare type Emptyable<T> = null | '' | T;
export interface RequestEvent {
    api_version: string;
    account?: string;
    idempotency_key?: string;
    method: string;
    path: string;
    request_start_time: number;
}
export interface ResponseEvent {
    api_version: string;
    account?: string;
    idempotency_key?: string;
    method: string;
    path: string;
    status: number;
    request_id: string;
    elapsed: number;
    request_start_time: number;
    request_end_time: number;
}
export interface MailSendData {
    subject: string;
    text: string;
    from: MailFrom;
    to?: MailTo;
    folder?: string;
}
interface MailFrom {
    name: string;
    surname: string;
    email: string;
    phone: string;
}
interface MailTo {
    name: string;
    surname: string;
    email: string;
    phone: string;
}
export interface FilterContent {
    (x: string): object;
}
export interface FilterGateway {
    type: string;
}
export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
}
export interface AppUser {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    user: User;
}
export interface AppUserRegisterResponse {
    path: string;
    token: string;
    user: AppUser;
}
export interface AppLoginData {
    email: string;
    password: string;
}
export {};
//# sourceMappingURL=index.d.ts.map