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
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_bcf_1 = require("../aurelia-bcf");
var NewTopicForm = (function () {
    function NewTopicForm(bcf) {
        this.bcf = bcf;
    }
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], NewTopicForm.prototype, "projectId", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], NewTopicForm.prototype, "topicId", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], NewTopicForm.prototype, "topicInstance", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], NewTopicForm.prototype, "commentInstance", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], NewTopicForm.prototype, "viewpointInstance", void 0);
    NewTopicForm = __decorate([
        aurelia_framework_1.customElement('bcf-new-topic-form'),
        aurelia_framework_1.inject(aurelia_bcf_1.AureliaBcf),
        __metadata("design:paramtypes", [aurelia_bcf_1.AureliaBcf])
    ], NewTopicForm);
    return NewTopicForm;
}());
exports.NewTopicForm = NewTopicForm;

//# sourceMappingURL=new-topic-form.js.map
