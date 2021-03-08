"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_fetch_client_1 = require("aurelia-fetch-client");
var aurelia_bcf_1 = require("./aurelia-bcf");
require("whatwg-fetch");
aurelia_framework_1.Container.instance.registerInstance('bcf-http-client', new aurelia_fetch_client_1.HttpClient);
var BcfApi = (function () {
    function BcfApi(bcf) {
        this.bcf = bcf;
        this.configured = false;
        this.http = aurelia_framework_1.Container.instance.get('bcf-http-client');
    }
    BcfApi.prototype.configureHost = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (this.configured && !force) {
            return;
        }
        this.bcf.debug('configureHost');
        if (!this.bcf.host) {
            throw new Error('BCF API can only be used if host is configured');
        }
        this.http.configure(function (config) {
            config
                .withDefaults({
                credentials: 'same-origin'
            })
                .withBaseUrl(_this.bcf.host);
        });
        this.configured = true;
    };
    BcfApi.prototype.defaultOptions = function (options) {
        if (options === void 0) { options = {}; }
        this.bcf.debug('defaultOptions', options);
        this.bcf.debug('state token', this.bcf.state.bcf.token);
        var o = {
            method: 'get',
            headers: {}
        };
        o = Object.assign({}, o, options);
        if (!o.headers['Content-Type'] && (!options.bodyFormat || options.bodyFormat === 'json')) {
            o.headers['Content-Type'] = 'application/json';
        }
        if (options.etag) {
            o.headers['ETAG'] = options.etag;
        }
        if (this.bcf.state.bcf.token) {
            o.headers.Authorization = 'Bearer ' + this.bcf.state.bcf.token;
        }
        return o;
    };
    BcfApi.prototype.extendEntrpoint = function (entrypoint) {
        if (this.bcf.extendEndpoint) {
            return this.bcf.extendEndpoint(entrypoint);
        }
        return entrypoint;
    };
    BcfApi.prototype.get = function (entrypoint, options) {
        if (options === void 0) { options = {}; }
        this.configureHost();
        return this.http.fetch(this.extendEntrpoint(entrypoint), this.defaultOptions(options));
    };
    BcfApi.prototype.post = function (entrypoint, body, options) {
        if (body === void 0) { body = {}; }
        if (options === void 0) { options = {}; }
        this.configureHost();
        var o = this.defaultOptions(options);
        o.method = 'post';
        o.body = this.normalizeBody(body, options);
        return this.http.fetch(this.extendEntrpoint(entrypoint), o);
    };
    BcfApi.prototype.put = function (entrypoint, body, options) {
        if (body === void 0) { body = {}; }
        if (options === void 0) { options = {}; }
        this.configureHost();
        var o = this.defaultOptions(options);
        o.method = 'put';
        o.body = this.normalizeBody(body, options);
        return this.http.fetch(this.extendEntrpoint(entrypoint), o);
    };
    BcfApi.prototype.delete = function (entrypoint, body, options) {
        if (body === void 0) { body = {}; }
        if (options === void 0) { options = {}; }
        this.configureHost();
        var o = this.defaultOptions(options);
        o.method = 'delete';
        o.body = this.normalizeBody(body, options);
        return this.http.fetch(this.extendEntrpoint(entrypoint), o);
    };
    BcfApi.prototype.normalizeBody = function (body, options) {
        if (!options.bodyFormat || options.bodyFormat === 'json') {
            body = JSON.stringify(body);
        }
        return body;
    };
    BcfApi = __decorate([
        aurelia_framework_1.inject(aurelia_bcf_1.AureliaBcf),
        __metadata("design:paramtypes", [aurelia_bcf_1.AureliaBcf])
    ], BcfApi);
    return BcfApi;
}());
exports.BcfApi = BcfApi;
var bcf = aurelia_framework_1.Container.instance.get(aurelia_bcf_1.AureliaBcf);
function jsonify(response) {
    return __awaiter(this, void 0, void 0, function () {
        var isError;
        return __generator(this, function (_a) {
            bcf.debug('jsonify:start', response);
            if (!response || !response.json)
                return [2, Promise.resolve(response)];
            if (response.status === 204) {
                return [2, Promise.resolve({})];
            }
            if (response.status === 404) {
                return [2, Promise.reject(new Error('Page not found'))];
            }
            isError = response.status > 299;
            return [2, response.json().catch(function (error) {
                    throw new Error('Invalid JSON response');
                }).then(function (jsonValue) {
                    bcf.debug('jsonify:json', jsonValue);
                    if (isError && jsonValue.error)
                        throw new Error(jsonValue.error);
                    else if (isError)
                        throw new Error('Unknown error');
                    return jsonValue;
                })];
        });
    });
}
exports.jsonify = jsonify;

//# sourceMappingURL=bcf-api.js.map
