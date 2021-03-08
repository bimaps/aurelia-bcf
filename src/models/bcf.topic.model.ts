export interface BcfTopicInterface {

  _projectId?: string;
  
  guid: string;
  title: string;
  description?: string;
  reference_links?: Array<string>;
  priority?: string;
  index?: number;
  labels?: Array<string>;
  assigned_to?: string;
  stage?: string;
  due_date?: string;

  creation_author?: string;
  creation_date?: string;
  modified_author?: string;
  modified_date?: string;

}
