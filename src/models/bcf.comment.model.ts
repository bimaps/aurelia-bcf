export interface BcfCommentInterface {

  _projectId?: string;
  _topicId?: string
  
  guid: string;
  viewpoint_guid?: string;
  comment: string;
  replyTo?: string;
  date?: string;
  
  creation_author?: string;
  creation_date?: string;
  modified_author?: string;
  modified_date?: string;

}
