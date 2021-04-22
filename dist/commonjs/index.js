"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
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
Object.defineProperty(exports, "AureliaBcf", { enumerable: true, get: function () { return aurelia_bcf_2.AureliaBcf; } });
var bcf_api_1 = require("./bcf-api");
Object.defineProperty(exports, "BcfApi", { enumerable: true, get: function () { return bcf_api_1.BcfApi; } });
__exportStar(require("./models"), exports);
__exportStar(require("./services"), exports);
__exportStar(require("./store"), exports);
__exportStar(require("./elements"), exports);
__exportStar(require("./value-converters"), exports);

//# sourceMappingURL=index.js.map
