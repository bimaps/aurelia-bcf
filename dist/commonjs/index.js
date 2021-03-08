"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_pal_1 = require("aurelia-pal");
var aurelia_bcf_1 = require("./aurelia-bcf");
function configure(aurelia, config) {
    if (config) {
        aurelia_framework_1.Container.instance.get(aurelia_bcf_1.AureliaBcf).configure(config);
    }
    aurelia.globalResources([
        aurelia_pal_1.PLATFORM.moduleName('./elements/comment-form'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/comment'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/new-topic-form'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/topic-form'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/topic'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/topics'),
        aurelia_pal_1.PLATFORM.moduleName('./value-converters/bcf-date'),
    ]);
}
exports.configure = configure;
var aurelia_bcf_2 = require("./aurelia-bcf");
exports.AureliaBcf = aurelia_bcf_2.AureliaBcf;
var bcf_api_1 = require("./bcf-api");
exports.BcfApi = bcf_api_1.BcfApi;
__export(require("./services"));
__export(require("./store"));
__export(require("./elements"));
__export(require("./value-converters"));

//# sourceMappingURL=index.js.map
