import * as moment from 'moment';
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
export { BcfDateValueConverter };

//# sourceMappingURL=bcf-date.js.map
