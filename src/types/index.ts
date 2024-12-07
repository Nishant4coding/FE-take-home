export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export type DataType = "posts" | "comments";

export interface Column {
  key: keyof (Post & Comment);
  header: string;
}

export type DataRecord = Post | Comment;
