import { inject, Container } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { AureliaBcf } from './aurelia-bcf';
import 'whatwg-fetch';

export interface RequestOption {
  method?: 'get' | 'post' | 'delete' | 'put';
  headers?: any;
  bodyFormat?: 'json' | 'FormData';
  etag?: string;
}

Container.instance.registerInstance('bcf-http-client', new HttpClient);

@inject(AureliaBcf)
export class BcfApi {

  
  private configured: boolean = false;
  private http: HttpClient;

  constructor(private bcf: AureliaBcf) {
    this.http = Container.instance.get('bcf-http-client');
  }

  public configureHost(force: boolean = false) {
    if (this.configured && !force) {
      return;
    }
    this.bcf.debug('configureHost');
    if (!this.bcf.host) {
      throw new Error('BCF API can only be used if host is configured');
    }
    this.http.configure((config) => {
      config
        //.useStandardConfiguration()
        .withDefaults({
          credentials: 'same-origin'
        })
        .withBaseUrl(this.bcf.host);
      });
    this.configured = true;
  }

  public defaultOptions(options: RequestOption = {}) {
    this.bcf.debug('defaultOptions', options);
    this.bcf.debug('state token', this.bcf.state.bcf.token);
    let o: any = {
      method: 'get',
      headers: {}
    };

    o = Object.assign({}, o, options);

    if (!o.headers['Content-Type'] && (!options.bodyFormat ||  options.bodyFormat === 'json')) {
      o.headers['Content-Type'] = 'application/json';
    }

    if (options.etag) {
      o.headers['ETAG'] = options.etag;
    }

    if (this.bcf.state.bcf.token) {
      o.headers.Authorization = 'Bearer ' + this.bcf.state.bcf.token;
    } 
    return o;
  }

  public extendEntrpoint(entrypoint: string): string {
    if (this.bcf.extendEndpoint) {
      return this.bcf.extendEndpoint(entrypoint);
    }
    return entrypoint;
  }

  public get(entrypoint: string, options: RequestOption = {}): Promise < any > {
    this.configureHost();
    return this.http.fetch(this.extendEntrpoint(entrypoint), this.defaultOptions(options));
  }

  public post(entrypoint: string, body: any = {}, options: RequestOption = {}): Promise < any > {
    this.configureHost();
    let o = this.defaultOptions(options);
    o.method = 'post';
    o.body = this.normalizeBody(body, options);
    return this.http.fetch(this.extendEntrpoint(entrypoint), o);
  }

  public put(entrypoint: string, body: any = {}, options: RequestOption = {}): Promise < any > {
    this.configureHost();
    let o = this.defaultOptions(options);
    o.method = 'put';
    o.body = this.normalizeBody(body, options);
    return this.http.fetch(this.extendEntrpoint(entrypoint), o);
  }

  public delete(entrypoint: string, options: RequestOption = {}): Promise < any > {
    this.configureHost();
    let o = this.defaultOptions(options);
    o.method = 'delete';
    return this.http.fetch(this.extendEntrpoint(entrypoint), o);
  }

  private normalizeBody(body: any, options: any) {
    if (!options.bodyFormat ||  options.bodyFormat === 'json') {
      body = JSON.stringify(body);
    }
    return body;
  }
}

const bcf = Container.instance.get(AureliaBcf);
export async function jsonify(response: any): Promise<any> {
  bcf.debug('jsonify:start', response);
  if (response.status === 204) {
    return Promise.resolve({});
  }
  if (response.status === 404) {
    return Promise.reject(new Error('Page not found'));
  }
  let isError = response.status > 299;
  return response.json().catch((error) => {
    throw new Error('Invalid JSON response');
  }).then((jsonValue) => {
    bcf.debug('jsonify:json', jsonValue);
    if (isError && jsonValue.error) throw new Error(jsonValue.error);
    else if (isError) throw new Error('Unknown error');
    return jsonValue;
  });
}
