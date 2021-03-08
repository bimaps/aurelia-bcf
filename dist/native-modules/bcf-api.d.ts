import { AureliaBcf } from './aurelia-bcf';
import 'whatwg-fetch';
export interface RequestOption {
    method?: 'get' | 'post' | 'delete' | 'put';
    headers?: any;
    bodyFormat?: 'json' | 'FormData';
    etag?: string;
}
export declare class BcfApi {
    private bcf;
    private configured;
    private http;
    constructor(bcf: AureliaBcf);
    configureHost(force?: boolean): void;
    defaultOptions(options?: RequestOption): any;
    extendEntrpoint(entrypoint: string): string;
    get(entrypoint: string, options?: RequestOption): Promise<any>;
    post(entrypoint: string, body?: any, options?: RequestOption): Promise<any>;
    put(entrypoint: string, body?: any, options?: RequestOption): Promise<any>;
    delete(entrypoint: string, body?: any, options?: RequestOption): Promise<any>;
    private normalizeBody;
}
export declare function jsonify(response: any): Promise<any>;
