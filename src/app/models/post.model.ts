export interface IPost {
  id: string;
  author: string;
  comments_count: number;
  text: string;
  created_date: string;
  last_modified_date: string;
  title: string;
  likes_count: number;
  tags: string;
  tags_count: number;
}

export type NewPost = Omit<IPost, 'id' | 'created_date' | 'last_modified_date'>;
