"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AureliaBcf = void 0;
var store_1 = require("./store");
var aurelia_logging_1 = require("aurelia-logging");
var AureliaBcf = (function () {
    function AureliaBcf() {
        this.host = '';
        this.topicCardTheme = {
            themeKey: 'card',
            background: '#fafafa',
            foreground: '#333'
        };
        this.commentCardTheme = {
            themeKey: 'card',
            background: '#dfdfdf',
            foreground: '#333'
        };
        this.ignoreDebugs = true;
        this.ignoreInfos = false;
        this.log = aurelia_logging_1.getLogger('aurelia-bcf');
    }
    AureliaBcf.prototype.configure = function (config) {
        this.debug('setConfig', config);
        if (config.host !== undefined) {
            this.host = config.host;
        }
        if (config.extendEndpoint !== undefined) {
            this.extendEndpoint = config.extendEndpoint;
        }
        if (config.ignoreDebugs !== undefined) {
            this.ignoreDebugs = config.ignoreDebugs;
        }
        if (config.ignoreInfos !== undefined) {
            this.ignoreInfos = config.ignoreInfos;
        }
        this.initStore();
    };
    AureliaBcf.prototype.initStore = function () {
        var _this = this;
        if (!store_1.store()) {
            throw new Error('Aurelia BCF plugin must be configured AFTER Aurelia Store. Consider setting the aurelia-store plugin earlier.');
        }
        store_1.registerAuthActions();
        store_1.registerCommentActions();
        store_1.registerProjectActions();
        store_1.registerTopicActions();
        store_1.registerViewpointActions();
        store_1.store().state.subscribe(function (state) {
            _this.debug('state update', state);
            _this.state = state;
        });
    };
    AureliaBcf.prototype.authenticate = function (token, refreshToken) {
        return store_1.store().dispatch(store_1.login, token, refreshToken);
    };
    AureliaBcf.prototype.debug = function (key) {
        var _a;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (!this.ignoreDebugs) {
            (_a = this.log).debug.apply(_a, __spreadArrays([key], params));
        }
    };
    AureliaBcf.prototype.info = function (key) {
        var _a;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (!this.ignoreInfos) {
            (_a = this.log).info.apply(_a, __spreadArrays([key], params));
        }
    };
    AureliaBcf.prototype.warn = function (key) {
        var _a;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        (_a = this.log).warn.apply(_a, __spreadArrays([key], params));
    };
    AureliaBcf.prototype.error = function (key) {
        var _a;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        (_a = this.log).error.apply(_a, __spreadArrays([key], params));
    };
    return AureliaBcf;
}());
exports.AureliaBcf = AureliaBcf;

//# sourceMappingURL=aurelia-bcf.js.map
