import { BcfProjectInterface, BcfTopicInterface, BcfCommentInterface, BcfViewpointInterface } from "../models/index";

export interface State {
  [key: string]: any;
  bcf: {
    loggedIn: boolean;
    token?: string;
    refreshToken?: string;
    projects: Array<BcfProjectInterface>;
    topics: Array<BcfTopicInterface>;
    comments: Array<BcfCommentInterface>;
    viewpoints: Array<BcfViewpointInterface>;
  };
}

export const initialState: State = {
  bcf: {
    loggedIn: false,
    projects: [],
    topics: [],
    comments: [],
    viewpoints: [],
  }
};
