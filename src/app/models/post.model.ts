import { IUser } from "./user.model";

export interface IPost {
  id: string;
  author: IUser;
  comments_count: number;
  text: string;
  created_date: string;
  last_modified_date: string;
  title: string;
  likes: string[];
  likedByMe: boolean;
  tags: string;
  tags_count: number;
}

export type NewPost = Omit<IPost, 'id' | 'created_date' | 'last_modified_date' | 'likes' | 'likedByMe' | 'comments_count' | 'author'> & { author: string };
