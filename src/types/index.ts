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
  key: keyof Post | keyof Comment;
  header: string;
}

export type DataRecord = Post | Comment;

const postColumns: Column[] = [
  { key: "userId", header: "User ID" },
  { key: "id", header: "ID" },
  { key: "title", header: "Title" },
  { key: "body", header: "Body" },
];

const commentColumns: Column[] = [
  { key: "postId", header: "Post ID" },
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "body", header: "Body" },
];
