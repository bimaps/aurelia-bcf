import { BcfTopicInterface, BcfViewpointInterface } from '../models/index';
import { inject, bindable, bindingMode, customElement } from 'aurelia-framework';
import { AureliaBcf } from '../aurelia-bcf';
import { BcfServices } from '../services/index';

@customElement('bcf-new-topic-form')
@inject(AureliaBcf)
export class NewTopicForm {
  
  @bindable projectId: string;
  @bindable topicId: string; // if provided, the form is an edit form, otherwise create

  @bindable({defaultBindingMode: bindingMode.twoWay}) private topicInstance: BcfTopicInterface;
  @bindable({defaultBindingMode: bindingMode.twoWay}) private commentInstance: BcfTopicInterface;
  @bindable({defaultBindingMode: bindingMode.twoWay}) private viewpointInstance: BcfViewpointInterface & {saveSnapshot?: boolean, saveComponents?: boolean};

  constructor(private bcf: AureliaBcf) {}

}
