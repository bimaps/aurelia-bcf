"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfDateValueConverter = void 0;
var moment = require("moment");
var BcfDateValueConverter = (function () {
    function BcfDateValueConverter() {
    }
    BcfDateValueConverter.prototype.toView = function (value, format) {
        if (format === void 0) { format = 'DD/MM/YYYY'; }
        return moment(value, 'iso-8601').format(format);
    };
    BcfDateValueConverter.prototype.fromView = function (value) {
    };
    return BcfDateValueConverter;
}());
exports.BcfDateValueConverter = BcfDateValueConverter;

//# sourceMappingURL=bcf-date.js.map
