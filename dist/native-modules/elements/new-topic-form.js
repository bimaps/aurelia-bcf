var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject, bindable, bindingMode, customElement } from 'aurelia-framework';
import { AureliaBcf } from '../aurelia-bcf';
var NewTopicForm = (function () {
    function NewTopicForm(bcf) {
        this.bcf = bcf;
    }
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], NewTopicForm.prototype, "projectId", void 0);
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], NewTopicForm.prototype, "topicId", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], NewTopicForm.prototype, "topicInstance", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], NewTopicForm.prototype, "commentInstance", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], NewTopicForm.prototype, "viewpointInstance", void 0);
    NewTopicForm = __decorate([
        customElement('bcf-new-topic-form'),
        inject(AureliaBcf),
        __metadata("design:paramtypes", [AureliaBcf])
    ], NewTopicForm);
    return NewTopicForm;
}());
export { NewTopicForm };

//# sourceMappingURL=new-topic-form.js.map
