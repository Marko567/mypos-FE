import { IUser } from "./user.model";

export interface IComment {
  id: string,
  post_id: string,
  created_by: IUser,
  reply_id: string | null,
  username_to_reply: string,
  content: string,
  created_date: string,
  last_modified_by: string,
  last_modified_date: string,
  banned: boolean
}

export interface ICommentWithReplies extends IComment {
  replies: IComment[]
}

export type NewComment = Omit<IComment, 'id' | 'created_date' | 'last_modified_date' | 'post_id' | 'banned' | 'last_modified_by' | 'created_by'>;
