export interface BcfProjectInterface {

  project_id?: string;
  name: string;
  extensions?: BcfProjectExtensions;

  creation_author?: string;
  creation_date?: string;
  modified_author?: string;
  modified_date?: string;

}

export interface BcfProjectExtensions {
  topic_type: Array<string>;
  topic_status: Array<string>;
  topic_label: Array<string>;
  snippet_type: Array<string>;
  priority: Array<string>;
  user_id_type: Array<string>;
  stage: Array<string>;
  project_actions: Array<string>;
  topic_actions: Array<string>;
  comment_actions: Array<string>;
}
